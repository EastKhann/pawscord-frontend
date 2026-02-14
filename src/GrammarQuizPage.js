import useGrammarQuiz from './GrammarQuizPage/useGrammarQuiz';
import LevelSelect from './GrammarQuizPage/LevelSelect';
import QuizResult from './GrammarQuizPage/QuizResult';
import QuizView from './GrammarQuizPage/QuizView';
import styles from './GrammarQuizPage/grammarQuizStyles';

const GrammarQuizPage = () => {
    const quiz = useGrammarQuiz();

    if (quiz.isLoading) return <div style={styles.container}>Yükleniyor...</div>;
    if (quiz.view === 'level-select') return <LevelSelect knownQuestions={quiz.knownQuestions} startQuiz={quiz.startQuiz} />;
    if (quiz.view === 'result') return <QuizResult score={quiz.score} totalQuestions={quiz.totalQuestions} resetQuiz={quiz.resetQuiz} />;
    return <QuizView {...quiz} />;
};

export default GrammarQuizPage;
