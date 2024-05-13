// 列表查询时筛选参数类型
// 获取详情返回参数类型
export interface UserInvoiceFormState {
    invoice_id?: number;
    title_type?: number;
    confirm?: boolean;
    is_confirm?: number;
    invoice_type?: number;
    is_add?: number;
    status?: number;
    invoice_content?: string;
    company_name?: string;
    company_code?: string;
    company_address?: string;
    company_phone?: string;
    company_bank?: string;
    company_account?: string;
    apply_reply?: string;
}

export interface UserInvoiceFormResult {
    item: UserInvoiceFormState;
}
export interface UserInvoiceStatus {
    item: boolean;
}

// 编辑表单
