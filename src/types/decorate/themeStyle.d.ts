export interface ThemeStyleFormResult {
    item: ThemeStyleFormState;
    color:ColorList[];
}

export interface ThemeStyleFormState {
    theme_id?: number;
    color1?: string;
    color2?: string;
    color3?: string;
    color4?: string;
}

export interface ColorList{
    theme_id:number;
    check?:boolean;
    color1?: string;
    color2?: string;
    color3?: string;
    color4?: string;
}


