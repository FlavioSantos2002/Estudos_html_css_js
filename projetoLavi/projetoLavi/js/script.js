let selectedAnswers = [];

document.getElementById('generateButton').addEventListener('click', function() {
    const questionsFile = document.getElementById('questionsFile').files[0];
    const answersFile = document.getElementById('answersFile').files[0];

    if (questionsFile && answersFile) {
        Promise.all([readDocxFile(questionsFile), readDocxFile(answersFile)]).then(function([questions, answers]) {
            const questionArray = splitContent(questions);
            const answerArray = splitContent(answers);

            if (questionArray.length === answerArray.length) {
                generateQuestionnaire(questionArray, answerArray);
                document.getElementById('finishButton').style.display = 'block';
                
            } else {
                alert('O número de questões e alternativas não corresponde.');
            }
        }).catch(function(error) {
            console.error('Erro ao processar os arquivos:', error);
        });
    } else {
        alert('Por favor, selecione ambos os arquivos.');
    }
});

function readDocxFile(file) {
    return new Promise(function(resolve, reject) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const arrayBuffer = event.target.result;

            mammoth.extractRawText({ arrayBuffer: arrayBuffer })
                .then(function(result) {
                    resolve(result.value);
                })
                .catch(function(err) {
                    reject(err);
                });
        };

        reader.readAsArrayBuffer(file);
    });
}

function splitContent(content) {
    return content.split('///').map(section => section.trim()).filter(section => section !== '');
}

function generateQuestionnaire(questions, answers) {
    
    const questionnaireDiv = document.getElementById('questionnaire');
    questionnaireDiv.innerHTML = ''; // Limpa o questionário anterior
    selectedAnswers = []; // Reseta as respostas selecionadas

    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionP = document.createElement('p');
        questionP.textContent = `Questão ${index + 1}: ${question}`;
        questionDiv.appendChild(questionP);

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');

        const options = answers[index].split('\n').map(option => option.trim()).filter(option => option !== '');
        options.forEach((option, optionIndex) => {
            const optionContainer = document.createElement('div');
            optionContainer.classList.add('option-container');

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = `question${index}`;
            radioInput.value = String.fromCharCode(97 + optionIndex); // 'a' para a primeira, 'b' para a segunda, etc.
            radioInput.addEventListener('change', function() {
                selectedAnswers[index] = radioInput.value;
            });

            const optionLabel = document.createElement('label');
            optionLabel.textContent = option;

            optionContainer.appendChild(radioInput);
            optionContainer.appendChild(optionLabel);
            optionsDiv.appendChild(optionContainer);
        });

        questionDiv.appendChild(optionsDiv);
        questionnaireDiv.appendChild(questionDiv);
    });
}

document.getElementById('finishButton').addEventListener('click', function() {
    if (selectedAnswers.length !== document.querySelectorAll('.question').length) {
        alert('Por favor, responda todas as perguntas.');
    } else {
        const selectedAnswersString = selectedAnswers.join('');
        alert(`Gabarito do usuário: ${selectedAnswersString}`);
        
        // Exibe o input para o gabarito oficial
        document.getElementById('officialAnswerSection').style.display = 'block';
    }
});

document.getElementById('submitOfficialAnswer').addEventListener('click', function() {
    const officialAnswer = document.getElementById('officialAnswer').value.trim();

    if (officialAnswer.length !== selectedAnswers.length) {
        alert('O gabarito oficial deve ter o mesmo número de respostas que o questionário.');
    } else {
        const userAnswers = selectedAnswers.join('');
        let correctCount = 0;

        for (let i = 0; i < officialAnswer.length; i++) {
            if (officialAnswer[i].toLowerCase() === userAnswers[i].toLowerCase()) {
                correctCount++;
            }
        }

        document.body.innerHTML = `
        <h2>FIM DO QUESTIONARIO</h2>
        <div style="position: relative; width: 100%; height: 0; padding-top: 56.2225%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
        <iframe loading="lazy"
            style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
            src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGQJtTpifI&#x2F;mOyj83xmv8-Bl-6P9ne0kQ&#x2F;view?embed"
            allowfullscreen="allowfullscreen" allow="fullscreen">
        </iframe>
    </div>
    `

        const percentage = (correctCount / officialAnswer.length) * 100;
        alert(`Você acertou ${correctCount} de ${officialAnswer.length} (${percentage.toFixed(2)}%)`);
    }

    
});
