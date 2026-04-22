import useGrammarQuiz from './useGrammarQuiz';
import LevelSelect from './LevelSelect';
import QuizResult from './QuizResult';
import QuizView from './QuizView';
import styles from './grammarQuizStyles';

import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const GrammarQuizPage = () => {
    const { t } = useTranslation();
    const quiz = useGrammarQuiz();

    if (quiz.isLoading)
        return (
            <div role="region" aria-label={t('aria.grammarQuizPage', 'Grammar Quiz')} style={styles.container}>
                {t('common.loading')}
            </div>
        );
    if (quiz.view === 'level-select')
        return <LevelSelect knownQuestions={quiz.knownQuestions} startQuiz={quiz.startQuiz} />;
    if (quiz.view === 'result')
        return (
            <QuizResult
                score={quiz.score}
                totalQuestions={quiz.totalQuestions}
                resetQuiz={quiz.resetQuiz}
            />
        );
    return <QuizView {...quiz} />;
};

GrammarQuizPage.propTypes = {};

export default GrammarQuizPage;
