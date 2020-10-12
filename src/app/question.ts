export interface Question {
    _id : number;
    title : string;
    body : string;
    tags : string;
    author : string;
    datetime : string;
    askorEdit : string;
    answer_ids : Number[];
    reports : String[];
}
