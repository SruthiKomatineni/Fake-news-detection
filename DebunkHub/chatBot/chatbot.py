from questionanswer import questions, answers, questions_embeddings
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


class chatBot:
    def __init__(self):
        self.received_answer = ""
        self.received_question = ""

    def calculate_sentence_similarity(self, sentence1):
        model = SentenceTransformer("../basenlimean")
        sentence1 = sentence1.replace("?", "")
        print(sentence1)
        exclude = '[!\#\$%\&\(\)\*\+,\."/:;<=>\?@\[\^_`\{\|\}\~]'
        sentence_embeddings = model.encode(
            [
                sentence1.translate(str.maketrans("", "", exclude)).lower(),
            ]
        )
        return sentence_embeddings[0]

