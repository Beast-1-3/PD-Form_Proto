// src/data/demoScript.ts
// Canonical 2-minute PD conversation script — DO NOT MODIFY FINANCIAL FIGURES

import type { PDField } from './pdFieldSchema';

export type Speaker = 'SM' | 'Borrower'; // SM = Sales Manager

export interface ScriptNudge {
  id: string;
  text: string;
  resolve?: string; // ID of nudge this resolves (to dismiss it)
}

export interface ScriptAlert {
  id: string;
  text: string;
  severity: 'info' | 'warning';
}

export interface ScriptAction {
  id: string;
  text: string;
}

export interface FieldUpdate {
  id: string; // matches PDField.id
  value: string;
  status: PDField['status'];
  verificationNote?: string;
}

export interface ScriptEvent {
  id: string;
  timeMs: number; // playback time in milliseconds
  speaker: Speaker;
  text: string;
  fieldUpdates?: FieldUpdate[];
  nudge?: ScriptNudge;
  alert?: ScriptAlert;
  action?: ScriptAction;
  resolveNudgeId?: string; // nudge to dismiss at this event
}

// The canonical two-minute PD conversation
// All events at 1x speed; engine scales timeMs for 2x
export const DEMO_SCRIPT: ScriptEvent[] = [
  // ─── 00:02 — SM opens ───────────────────────────────────────────────────────
  {
    id: 'evt_002',
    timeMs: 2000,
    speaker: 'SM',
    text: 'अच्छा रमेश जी, सबसे पहले बताइए, आपका मोबाइल नंबर आधार से लिंक है ना?',
    // No field update yet
  },

  // ─── 00:07 — Borrower confirms Aadhaar linkage ──────────────────────────────
  {
    id: 'evt_007',
    timeMs: 7000,
    speaker: 'Borrower',
    text: 'हाँ सर, आधार से यही वाला नंबर लिंक है।',
    fieldUpdates: [
      {
        id: 'q9_aadhaar_mobile',
        value: 'Yes (Borrower Reported)',
        status: 'captured',
        verificationNote: 'Borrower-stated; not independently verified',
      },
    ],
  },

  // ─── 00:11 — SM asks about bank mobile ─────────────────────────────────────
  {
    id: 'evt_011',
    timeMs: 11000,
    speaker: 'SM',
    text: 'और जिस बैंक अकाउंट से EMI कटेगी, उसमें भी यही नंबर लगा है?',
  },

  // ─── 00:15 — Borrower confirms bank mobile ──────────────────────────────────
  {
    id: 'evt_015',
    timeMs: 15000,
    speaker: 'Borrower',
    text: 'जी सर, बैंक में भी यही नंबर रजिस्टर्ड है।',
    fieldUpdates: [
      {
        id: 'q10_bank_mobile',
        value: 'Yes (Borrower Reported)',
        status: 'captured',
        verificationNote: 'Borrower-stated; not independently verified',
      },
    ],
  },

  // ─── 00:19 — SM asks family details ─────────────────────────────────────────
  {
    id: 'evt_019',
    timeMs: 19000,
    speaker: 'SM',
    text: 'ठीक है। अब अपने परिवार के बारे में थोड़ा बताइए। घर में कौन-कौन हैं?',
  },

  // ─── 00:24 — Borrower describes family ──────────────────────────────────────
  {
    id: 'evt_024',
    timeMs: 24000,
    speaker: 'Borrower',
    text: 'मेरी पत्नी सुनीता हैं और दो बच्चे हैं। माता-पिता गाँव में रहते हैं, और मेरा एक भाई भी है।',
    fieldUpdates: [
      { id: 'q11_spouse', value: 'Sunita Gupta', status: 'captured' },
      { id: 'q11_children', value: '2', status: 'captured' },
      { id: 'q11_dependents', value: 'Parents (village), 1 brother', status: 'captured' },
    ],
  },

  // ─── 00:29 — SM asks professional background ────────────────────────────────
  {
    id: 'evt_029',
    timeMs: 29000,
    speaker: 'SM',
    text: 'पहले क्या काम करते थे और अपना बिज़नेस कब शुरू किया?',
  },

  // ─── 00:34 — Borrower describes journey ─────────────────────────────────────
  {
    id: 'evt_034',
    timeMs: 34000,
    speaker: 'Borrower',
    text: 'पहले तीन साल एक थोक की दुकान पर काम किया था। फिर आठ साल पहले अपनी दुकान शुरू कर दी।',
    fieldUpdates: [
      { id: 'q12_prev_work', value: 'Wholesale Shop Employee', status: 'captured' },
      { id: 'q12_prev_experience', value: '3 Years', status: 'captured' },
      { id: 'q12_current_duration', value: '8 Years', status: 'captured' },
    ],
  },

  // ─── 00:39 — SM asks about current business ─────────────────────────────────
  {
    id: 'evt_039',
    timeMs: 39000,
    speaker: 'SM',
    text: 'अभी आपकी दुकान का नाम क्या है और किस चीज़ का काम करते हैं?',
  },

  // ─── 00:44 — Borrower describes business ────────────────────────────────────
  {
    id: 'evt_044',
    timeMs: 44000,
    speaker: 'Borrower',
    text: 'गुप्ता जनरल स्टोर है सर। किराने का रिटेल काम है, अपनी ही दुकान चलाता हूँ।',
    fieldUpdates: [
      { id: 'q13_business_name', value: 'Gupta General Store', status: 'captured' },
      { id: 'q13_nature', value: 'Grocery / Kirana Retail', status: 'captured' },
      { id: 'q13_employment_type', value: 'Self Employed', status: 'captured' },
      { id: 'q13_role', value: 'Proprietor', status: 'captured' },
    ],
  },

  // ─── 00:48 — SM asks about suppliers ────────────────────────────────────────
  {
    id: 'evt_048',
    timeMs: 48000,
    speaker: 'SM',
    text: 'आपके दो बड़े सप्लायर कौन हैं? उनके मोबाइल नंबर भी चाहिए होंगे।',
  },

  // ─── 00:53 — Borrower gives supplier names (no numbers) ─────────────────────
  {
    id: 'evt_053',
    timeMs: 53000,
    speaker: 'Borrower',
    text: 'शर्मा डिस्ट्रीब्यूटर्स और मेट्रो होलसेल से माल आता है। नंबर अभी याद नहीं हैं सर।',
    fieldUpdates: [
      { id: 'q14_supplier1', value: 'Sharma Distributors', status: 'captured' },
      { id: 'q14_supplier1_contact', value: 'Pending', status: 'partial' },
      { id: 'q14_supplier2', value: 'Metro Wholesale', status: 'captured' },
      { id: 'q14_supplier2_contact', value: 'Pending', status: 'partial' },
    ],
    nudge: {
      id: 'nudge_supplier_numbers',
      text: 'Supplier mobile numbers are still missing — collect before end of session.',
    },
    action: {
      id: 'action_supplier_numbers',
      text: 'Obtain mobile numbers for Sharma Distributors and Metro Wholesale.',
    },
  },

  // ─── 00:57 — SM asks about monthly turnover ─────────────────────────────────
  {
    id: 'evt_057',
    timeMs: 57000,
    speaker: 'SM',
    text: 'अच्छा, महीने में दुकान से कितना काम हो जाता है?',
  },

  // ─── 01:02 — Borrower says "तीन बीस" — AMBIGUOUS ────────────────────────────
  {
    id: 'evt_062',
    timeMs: 62000,
    speaker: 'Borrower',
    text: 'सर, करीब तीन बीस का काम हो जाता है।',
    // DO NOT update income field — amount is ambiguous (sales vs profit?)
    nudge: {
      id: 'nudge_income_ambiguous',
      text: 'Clarify: does ₹3.20 lakh refer to monthly sales, profit, or another figure?',
    },
  },

  // ─── 01:07 — SM asks for clarification ──────────────────────────────────────
  {
    id: 'evt_067',
    timeMs: 67000,
    speaker: 'SM',
    text: 'तीन लाख बीस हज़ार की बिक्री होती है या इतना पैसा बचता है?',
  },

  // ─── 01:12 — Borrower clarifies + adds rental income ───────────────────────
  {
    id: 'evt_072',
    timeMs: 72000,
    speaker: 'Borrower',
    text: 'बिक्री होती है सर, महीने की तीन लाख बीस हज़ार। और एक कमरे के किराए से बीस हज़ार अलग आते हैं।',
    fieldUpdates: [
      // Resolve ambiguity — now confirmed as sales/receipts, not profit
      { id: 'q15_business_income', value: '₹3,20,000 (Monthly Sales)', status: 'captured' },
      { id: 'q15_other_income', value: '₹20,000 (Rental)', status: 'captured' },
      { id: 'q15_total_income', value: '₹3,40,000', status: 'captured' },
    ],
    resolveNudgeId: 'nudge_income_ambiguous',
  },

  // ─── 01:17 — SM asks about expenses ─────────────────────────────────────────
  {
    id: 'evt_077',
    timeMs: 77000,
    speaker: 'SM',
    text: 'माल खरीदने, स्टाफ की सैलरी और दुकान के किराए में कितना खर्चा होता है?',
  },

  // ─── 01:22 — Borrower gives primary expenses ────────────────────────────────
  {
    id: 'evt_082',
    timeMs: 82000,
    speaker: 'Borrower',
    text: 'माल में एक लाख अस्सी हज़ार, स्टाफ की तीस हज़ार सैलरी और दुकान का पंद्रह हज़ार किराया है।',
    fieldUpdates: [
      { id: 'q15_cost_of_goods', value: '₹1,80,000', status: 'captured' },
      { id: 'q15_staff_salary', value: '₹30,000', status: 'captured' },
      { id: 'q15_shop_rent', value: '₹15,000', status: 'captured' },
    ],
  },

  // ─── 01:27 — SM asks about remaining expenses ───────────────────────────────
  {
    id: 'evt_087',
    timeMs: 87000,
    speaker: 'SM',
    text: 'और बिजली, बाकी दुकान के खर्चे और घर का खर्चा कितना है?',
  },

  // ─── 01:32 — Borrower completes expenses → triggers net calculation ─────────
  {
    id: 'evt_092',
    timeMs: 92000,
    speaker: 'Borrower',
    text: 'बिजली के पाँच हज़ार, बाकी दस हज़ार और घर में करीब पच्चीस हज़ार खर्च हो जाते हैं।',
    fieldUpdates: [
      { id: 'q15_electricity', value: '₹5,000', status: 'captured' },
      { id: 'q15_miscellaneous', value: '₹10,000', status: 'captured' },
      { id: 'q15_family_expenses', value: '₹25,000', status: 'captured' },
      // Total Expenses = 1,80,000 + 30,000 + 15,000 + 5,000 + 10,000 + 25,000 = 2,65,000
      // Net Appraisal = 3,40,000 − 2,65,000 = 75,000
      { id: 'q15_net_appraisal', value: '₹75,000', status: 'captured' },
    ],
  },

  // ─── 01:37 — SM asks about existing loans ───────────────────────────────────
  {
    id: 'evt_097',
    timeMs: 97000,
    speaker: 'SM',
    text: 'अभी कोई लोन चल रहा है? हर महीने कितनी EMI जाती है?',
  },

  // ─── 01:41 — Borrower mentions vehicle loan ─────────────────────────────────
  {
    id: 'evt_101',
    timeMs: 101000,
    speaker: 'Borrower',
    text: 'हाँ सर, गाड़ी का लोन है। उसकी पंद्रह हज़ार रुपये EMI जाती है।',
    fieldUpdates: [
      { id: 'q16_loan_type', value: 'Vehicle Loan', status: 'captured' },
      { id: 'q16_monthly_emi', value: '₹15,000', status: 'captured' },
      // Net In Hand = 75,000 − 15,000 = 60,000
      { id: 'q15_net_in_hand', value: '₹60,000', status: 'captured' },
    ],
  },

  // ─── 01:45 — SM asks about EMI bounces ──────────────────────────────────────
  {
    id: 'evt_105',
    timeMs: 105000,
    speaker: 'SM',
    text: 'उस EMI में कभी बाउंस हुआ है क्या?',
  },

  // ─── 01:49 — Borrower admits 1 bounce ───────────────────────────────────────
  {
    id: 'evt_109',
    timeMs: 109000,
    speaker: 'Borrower',
    text: 'हाँ, पिछले साल एक बार बैलेंस कम था। अगले दिन पैसे डाल दिए थे।',
    fieldUpdates: [
      { id: 'q17_bounce_reported', value: 'Yes (Borrower Reported)', status: 'captured' },
      { id: 'q17_bounce_count', value: '1', status: 'captured' },
      { id: 'q17_bounce_timing', value: 'Previous Year', status: 'captured' },
      {
        id: 'q17_verification',
        value: 'Pending Bureau Check',
        status: 'needs_clarification',
        verificationNote: 'Borrower says payment was made next day — requires bureau/lender cross-check',
      },
    ],
    action: {
      id: 'action_emi_bounce',
      text: 'Cross-check reported EMI bounce against credit bureau and loan account records.',
    },
  },

  // ─── 01:52 — SM asks about property ─────────────────────────────────────────
  {
    id: 'evt_112',
    timeMs: 112000,
    speaker: 'SM',
    text: 'और जो मकान खरीद रहे हैं, उसकी कीमत और आपका अपना योगदान कितना है?',
  },

  // ─── 01:56 — Borrower gives property details ────────────────────────────────
  {
    id: 'evt_116',
    timeMs: 116000,
    speaker: 'Borrower',
    text: 'गाज़ियाबाद में मकान है सर। इकतीस लाख की कीमत है और अपनी तरफ से साढ़े बारह लाख लगा रहे हैं।',
    fieldUpdates: [
      { id: 'q18_purpose', value: 'Purchase', status: 'captured' },
      { id: 'q18_location', value: 'Ghaziabad', status: 'captured' },
      {
        id: 'q18_property_value',
        value: '₹31,00,000 (Borrower Estimate)',
        status: 'captured',
        verificationNote: 'Borrower-estimated — formal valuation pending',
      },
      { id: 'q18_own_contribution', value: '₹12,50,000', status: 'captured' },
    ],
  },

  // ─── 02:00 — Script complete marker ─────────────────────────────────────────
  {
    id: 'evt_120',
    timeMs: 120000,
    speaker: 'SM',
    text: '[Script Complete — All PD fields captured. Session ready to close.]',
    // Internal marker — this message is styled differently (system message)
  },
];

// Named jump points for the demo control panel
export const JUMP_POINTS = {
  income: 62000,       // Jump to income ambiguity section
  emi: 97000,          // Jump to existing loan/EMI section
  property: 112000,    // Jump to property details section
} as const;
