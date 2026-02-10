// frontend/src/utils/workerManager.js

/**
 * 🔧 Web Worker Manager
 * Worker thread yönetimi ve task queue
 */

class WorkerManager {
    constructor() {
        this.workers = new Map();
        this.taskQueue = [];
        this.taskId = 0;
        this.maxWorkers = navigator.hardwareConcurrency || 4;
        this.activeWorkers = 0;
    }

    /**
     * Create or get worker
     */
    getWorker(workerPath) {
        if (!this.workers.has(workerPath)) {
            try {
                const worker = new Worker(workerPath);
                this.workers.set(workerPath, {
                    worker,
                    busy: false,
                    tasks: new Map()
                });

                worker.addEventListener('message', (event) => {
                    this.handleWorkerMessage(workerPath, event);
                });

                worker.addEventListener('error', (error) => {
                    console.error(`❌ [Worker] Error in ${workerPath}:`, error);
                });

                if (import.meta.env.MODE === 'development') {
                }
            } catch (error) {
                console.error(`❌ [Worker] Failed to create worker:`, error);
                return null;
            }
        }

        return this.workers.get(workerPath);
    }

    /**
     * Handle worker message
     */
    handleWorkerMessage(workerPath, event) {
        const { id, type, result, error } = event.data;
        const workerData = this.workers.get(workerPath);

        if (!workerData) return;

        const task = workerData.tasks.get(id);
        if (!task) return;

        // Remove task
        workerData.tasks.delete(id);
        workerData.busy = workerData.tasks.size > 0;
        this.activeWorkers--;

        // Resolve/reject promise
        if (type === 'SUCCESS') {
            task.resolve(result);
        } else if (type === 'ERROR') {
            task.reject(new Error(error));
        }

        // Process next task in queue
        this.processQueue();
    }

    /**
     * Run task in worker
     */
    async runTask(workerPath, taskType, payload, options = {}) {
        const { timeout = 30000, priority = 5 } = options;

        return new Promise((resolve, reject) => {
            const id = ++this.taskId;
            const task = {
                id,
                workerPath,
                taskType,
                payload,
                priority,
                timeout,
                resolve,
                reject,
                timestamp: Date.now()
            };

            // Add to queue
            this.taskQueue.push(task);
            this.taskQueue.sort((a, b) => b.priority - a.priority);

            // Process queue
            this.processQueue();

            // Timeout
            setTimeout(() => {
                const index = this.taskQueue.findIndex(t => t.id === id);
                if (index !== -1) {
                    this.taskQueue.splice(index, 1);
                    reject(new Error('Worker task timeout'));
                }
            }, timeout);
        });
    }

    /**
     * Process task queue
     */
    processQueue() {
        while (this.taskQueue.length > 0 && this.activeWorkers < this.maxWorkers) {
            const task = this.taskQueue.shift();
            this.executeTask(task);
        }
    }

    /**
     * Execute task
     */
    executeTask(task) {
        const workerData = this.getWorker(task.workerPath);
        if (!workerData) {
            task.reject(new Error('Worker not available'));
            return;
        }

        workerData.busy = true;
        workerData.tasks.set(task.id, task);
        this.activeWorkers++;

        // Send message to worker
        workerData.worker.postMessage({
            id: task.id,
            type: task.taskType,
            payload: task.payload
        });

        if (import.meta.env.MODE === 'development') {
        }
    }

    /**
     * Terminate worker
     */
    terminateWorker(workerPath) {
        const workerData = this.workers.get(workerPath);
        if (workerData) {
            workerData.worker.terminate();
            this.workers.delete(workerPath);

            if (import.meta.env.MODE === 'development') {
            }
        }
    }

    /**
     * Terminate all workers
     */
    terminateAll() {
        this.workers.forEach((workerData, path) => {
            workerData.worker.terminate();
        });
        this.workers.clear();
        this.taskQueue = [];
        this.activeWorkers = 0;

        if (import.meta.env.MODE === 'development') {
        }
    }

    /**
     * Get stats
     */
    getStats() {
        return {
            totalWorkers: this.workers.size,
            activeWorkers: this.activeWorkers,
            queuedTasks: this.taskQueue.length,
            maxWorkers: this.maxWorkers,
            workers: Array.from(this.workers.entries()).map(([path, data]) => ({
                path,
                busy: data.busy,
                activeTasks: data.tasks.size
            }))
        };
    }
}

// Global instance
export const workerManager = new WorkerManager();

/**
 * Helper function - Run data processing task
 */
export const processDataInWorker = async (taskType, payload, options) => {
    const workerPath = new URL('../workers/dataProcessor.worker.js', import.meta.url);
    return workerManager.runTask(workerPath.href, taskType, payload, options);
};

/**
 * React Hook
 */
export const useWebWorker = (workerPath) => {
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const runTask = React.useCallback(async (taskType, payload, options) => {
        setLoading(true);
        setError(null);

        try {
            const data = await workerManager.runTask(workerPath, taskType, payload, options);
            setResult(data);
            return data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [workerPath]);

    return { result, loading, error, runTask };
};

export default WorkerManager;


