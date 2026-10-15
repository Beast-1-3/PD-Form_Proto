// src/data/pdFieldSchema.ts
// Hero Housing Finance PD Field Definitions Q9–Q18

export type FieldStatus = 'pending' | 'captured' | 'partial' | 'needs_clarification';
export type FieldSource = 'case_prefill' | 'borrower_conversation' | 'calculated';
export type BadgeType = 'C' | 'P'; // C = Captured/Complete, P = Pending

export interface PDField {
  id: string;
  questionGroup: string;
  questionNumber: string; // Q9, Q10, etc.
  label: string;
  value: string | null;
  status: FieldStatus;
  source: FieldSource;
  evidenceEventId?: string;
  evidenceTimestamp?: number;
  evidenceText?: string;
  verificationNote?: string;
}

export function getBadge(status: FieldStatus): BadgeType {
  return status === 'captured' || status === 'partial' ? 'C' : 'P';
}

export function getInitialPDFields(): PDField[] {
  return [
    // Q9 - Aadhaar Mobile Linkage
    {
      id: 'q9_aadhaar_mobile',
      questionGroup: 'Q9',
      questionNumber: 'Q9',
      label: 'Aadhaar Mobile Linked',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },

    // Q10 - Repayment Bank Mobile Linkage
    {
      id: 'q10_bank_mobile',
      questionGroup: 'Q10',
      questionNumber: 'Q10',
      label: 'EMI Bank Mobile Registered',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },

    // Q11 - Family Information
    {
      id: 'q11_spouse',
      questionGroup: 'Q11',
      questionNumber: 'Q11',
      label: 'Spouse Name',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q11_children',
      questionGroup: 'Q11',
      questionNumber: 'Q11',
      label: 'Number of Children',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q11_dependents',
      questionGroup: 'Q11',
      questionNumber: 'Q11',
      label: 'Other Dependents',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },

    // Q12 - Professional Journey
    {
      id: 'q12_prev_work',
      questionGroup: 'Q12',
      questionNumber: 'Q12',
      label: 'Previous Occupation',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q12_prev_experience',
      questionGroup: 'Q12',
      questionNumber: 'Q12',
      label: 'Previous Experience',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q12_current_duration',
      questionGroup: 'Q12',
      questionNumber: 'Q12',
      label: 'Current Business Duration',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },

    // Q13 - Current Business Profile
    {
      id: 'q13_business_name',
      questionGroup: 'Q13',
      questionNumber: 'Q13',
      label: 'Business Name',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q13_nature',
      questionGroup: 'Q13',
      questionNumber: 'Q13',
      label: 'Nature of Business',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q13_employment_type',
      questionGroup: 'Q13',
      questionNumber: 'Q13',
      label: 'Employment Type',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q13_role',
      questionGroup: 'Q13',
      questionNumber: 'Q13',
      label: 'Role / Designation',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },

    // Q14 - Major Suppliers
    {
      id: 'q14_supplier1',
      questionGroup: 'Q14',
      questionNumber: 'Q14',
      label: 'Supplier 1 Name',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q14_supplier1_contact',
      questionGroup: 'Q14',
      questionNumber: 'Q14',
      label: 'Supplier 1 Contact',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q14_supplier2',
      questionGroup: 'Q14',
      questionNumber: 'Q14',
      label: 'Supplier 2 Name',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q14_supplier2_contact',
      questionGroup: 'Q14',
      questionNumber: 'Q14',
      label: 'Supplier 2 Contact',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },

    // Q15 - Monthly Income & Expenditure
    {
      id: 'q15_business_income',
      questionGroup: 'Q15',
      questionNumber: 'Q15',
      label: 'Monthly Business Sales',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q15_other_income',
      questionGroup: 'Q15',
      questionNumber: 'Q15',
      label: 'Other Monthly Income',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q15_total_income',
      questionGroup: 'Q15',
      questionNumber: 'Q15',
      label: 'Total Monthly Income',
      value: null,
      status: 'pending',
      source: 'calculated',
    },
    {
      id: 'q15_cost_of_goods',
      questionGroup: 'Q15',
      questionNumber: 'Q15',
      label: 'Cost of Goods',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q15_staff_salary',
      questionGroup: 'Q15',
      questionNumber: 'Q15',
      label: 'Staff Salary',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q15_shop_rent',
      questionGroup: 'Q15',
      questionNumber: 'Q15',
      label: 'Shop Rent',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q15_electricity',
      questionGroup: 'Q15',
      questionNumber: 'Q15',
      label: 'Electricity',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q15_miscellaneous',
      questionGroup: 'Q15',
      questionNumber: 'Q15',
      label: 'Misc. Expenses',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q15_family_expenses',
      questionGroup: 'Q15',
      questionNumber: 'Q15',
      label: 'Family Expenses',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q15_net_appraisal',
      questionGroup: 'Q15',
      questionNumber: 'Q15',
      label: 'Net Monthly Appraisal Income',
      value: null,
      status: 'pending',
      source: 'calculated',
    },

    // Q16 - Existing Loans
    {
      id: 'q16_loan_type',
      questionGroup: 'Q16',
      questionNumber: 'Q16',
      label: 'Existing Loan Type',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q16_monthly_emi',
      questionGroup: 'Q16',
      questionNumber: 'Q16',
      label: 'Monthly EMI',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q15_net_in_hand',
      questionGroup: 'Q15',
      questionNumber: 'Q15',
      label: 'Net Income in Hand',
      value: null,
      status: 'pending',
      source: 'calculated',
    },

    // Q17 - EMI Bounce History
    {
      id: 'q17_bounce_reported',
      questionGroup: 'Q17',
      questionNumber: 'Q17',
      label: 'EMI Bounce Reported',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q17_bounce_count',
      questionGroup: 'Q17',
      questionNumber: 'Q17',
      label: 'Bounce Count (Reported)',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q17_bounce_timing',
      questionGroup: 'Q17',
      questionNumber: 'Q17',
      label: 'Bounce Timing',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q17_verification',
      questionGroup: 'Q17',
      questionNumber: 'Q17',
      label: 'Bureau Verification',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },

    // Q18 - Property Details
    {
      id: 'q18_purpose',
      questionGroup: 'Q18',
      questionNumber: 'Q18',
      label: 'Property Purpose',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q18_location',
      questionGroup: 'Q18',
      questionNumber: 'Q18',
      label: 'Property Location',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q18_property_value',
      questionGroup: 'Q18',
      questionNumber: 'Q18',
      label: 'Borrower-Reported Value',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
      verificationNote: 'Borrower-estimated — valuation pending',
    },
    {
      id: 'q18_own_contribution',
      questionGroup: 'Q18',
      questionNumber: 'Q18',
      label: 'Own Contribution',
      value: null,
      status: 'pending',
      source: 'borrower_conversation',
    },
    {
      id: 'q18_loan_amount',
      questionGroup: 'Q18',
      questionNumber: 'Q18',
      label: 'Requested Loan Amount',
      value: '₹18,50,000',
      status: 'captured',
      source: 'case_prefill',
    },
  ];
}

// Q group status summary
export interface QGroupStatus {
  questionNumber: string;
  label: string;
  status: 'captured' | 'partial' | 'pending';
}

export function getQuestionGroupStatuses(fields: PDField[]): QGroupStatus[] {
  const groups: Record<string, { label: string; fields: PDField[] }> = {
    Q9: { label: 'Aadhaar Mobile Linkage', fields: [] },
    Q10: { label: 'Repayment Bank Mobile', fields: [] },
    Q11: { label: 'Family Information', fields: [] },
    Q12: { label: 'Professional Journey', fields: [] },
    Q13: { label: 'Current Business Profile', fields: [] },
    Q14: { label: 'Major Suppliers', fields: [] },
    Q15: { label: 'Monthly Income & Expenditure', fields: [] },
    Q16: { label: 'Existing Loans & EMIs', fields: [] },
    Q17: { label: 'EMI Bounce History', fields: [] },
    Q18: { label: 'Property Details', fields: [] },
  };

  for (const field of fields) {
    if (groups[field.questionNumber]) {
      groups[field.questionNumber].fields.push(field);
    }
  }

  return Object.entries(groups).map(([qNum, { label, fields: qFields }]) => {
    const allCaptured = qFields.every(f => f.status === 'captured');
    const anyPartialOrCaptured = qFields.some(f => f.status === 'captured' || f.status === 'partial');
    const status = allCaptured ? 'captured' : anyPartialOrCaptured ? 'partial' : 'pending';
    return { questionNumber: qNum, label, status };
  });
}
