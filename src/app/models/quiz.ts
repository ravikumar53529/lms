export class Quiz {
    data?: {
        all_answer?: {
            A: number | string;
            B: number | string;
            C: number | string;
            D: number | string;
        };
        syllabus?: string;
        question?: string;
        correct_answer?: string;
    }


    // constructor(data: {
    //     all_answer: { A: number; B: number; C: number; D: number };
    //     syllabus: string;
    //     question: string;
    //     correct_answer: string;
    // }) {
    //     this.all_answer = data.all_answer;
    //     this.syllabus = data.syllabus;
    //     this.question = data.question;
    //     this.correct_answer = data.correct_answer;
    // }
}


export class QuizResponse {

    id?: number;
    attributes?: {
        syllabus?: string;
        question?: string;
        createdAt?: string;
        updatedAt?: string;
        publishedAt?: string;
        all_answer?: {
            A: number | string;
            B: number | string;
            C: number | string;
            D: number | string;
        };
        correct_answer?: string;
    }


}

export class QuizData {
    data?: QuizResponse[];
    meta?: {
        pagination: {
            page: number | undefined;
            pageSize: number | undefined;
            pageCount: number | undefined;
            total: number | undefined;
        }
    };
}