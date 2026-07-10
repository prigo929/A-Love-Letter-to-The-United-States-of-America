// ─── State Revenue (How States Make Money) ────────────────────────────────────
// Source: U.S. Census Bureau, 2024 Annual Survey of State Government Finances
//   (GS00STATEFIN01 time-series table, fiscal year 2024).
// Figures are STATE government "general revenue" only, in thousands of dollars.
// General revenue excludes liquor stores, utilities and insurance-trust revenue.
//
// The buckets below partition `total` exactly (verified: sum(parts) === total for
// all 50 states), so shares always add to 100% and nothing is double-counted.
//
// Cross-checked against The Pew Charitable Trusts' "Where States Get Their Money,
// FY2024": e.g. federal share, US = 34.2% (Pew 0.342), Alaska = 48.8% (Pew 0.4882).
//
// Generated from ASSETS/Tables — do not hand-edit.

export const REVENUE_FISCAL_YEAR = 2024;

export interface StateRevenue {
  /** Total general revenue, $ thousands. */
  total: number;
  /** Intergovernmental revenue from the federal government. */
  federal: number;
  /** Intergovernmental revenue from local governments. */
  localGrants: number;
  incomeIndividual: number;
  incomeCorporate: number;
  /** General sales & gross receipts tax. Zero in states with no statewide sales tax. */
  salesGeneral: number;
  /** Selective sales taxes: fuel, tobacco, alcohol, insurance premiums, etc. */
  salesSelective: number;
  property: number;
  /** Severance taxes on oil, gas, coal and minerals. */
  severance: number;
  otherTaxes: number;
  /** Current charges: tuition, hospital fees, tolls, park fees. */
  charges: number;
  /** Net lottery revenue (ticket sales less prizes and administration). */
  lottery: number;
  royalties: number;
  otherMisc: number;
}


export const NATIONAL_REVENUE: StateRevenue = { total: 3133509453, federal: 1071759885, localGrants: 24750353, incomeIndividual: 479325719, incomeCorporate: 165406390, salesGeneral: 466119937, salesSelective: 210096465, property: 23374108, severance: 21655472, otherTaxes: 103029986, charges: 317171685, lottery: 34510467, royalties: 8104344, otherMisc: 208204642 };


export const STATE_REVENUE: Record<string, StateRevenue> = {
  AK: { total: 10505883, federal: 5128660, localGrants: 10679, incomeIndividual: 0, incomeCorporate: 389125, salesGeneral: 0, salesSelective: 322606, property: 130855, severance: 1037074, otherTaxes: 106186, charges: 830723, lottery: 0, royalties: 53426, otherMisc: 2496549 },
  AL: { total: 44873170, federal: 16943735, localGrants: 224452, incomeIndividual: 5281413, incomeCorporate: 2181796, salesGeneral: 4592131, salesSelective: 3514105, property: 620698, severance: 38337, otherTaxes: 667201, charges: 8000692, lottery: 0, royalties: 37125, otherMisc: 2771485 },
  AR: { total: 28958372, federal: 11007319, localGrants: 13321, incomeIndividual: 2759813, incomeCorporate: 972457, salesGeneral: 5068041, salesSelective: 1746959, property: 1515978, severance: 36372, otherTaxes: 574670, charges: 3333724, lottery: 158428, royalties: 606, otherMisc: 1770684 },
  AZ: { total: 59349431, federal: 27551605, localGrants: 249857, incomeIndividual: 4808643, incomeCorporate: 1784908, salesGeneral: 13156640, salesSelective: 2186297, property: 762865, severance: 21513, otherTaxes: 874750, charges: 4184475, lottery: 604225, royalties: 0, otherMisc: 3163653 },
  CA: { total: 477707356, federal: 133779551, localGrants: 6656229, incomeIndividual: 123101651, incomeCorporate: 41408314, salesGeneral: 53333417, salesSelective: 20731911, property: 3558041, severance: 133222, otherTaxes: 23284123, charges: 41253049, lottery: 3243543, royalties: 123196, otherMisc: 27101109 },
  CO: { total: 44758826, federal: 16392498, localGrants: 94642, incomeIndividual: 6799855, incomeCorporate: 2594804, salesGeneral: 4666039, salesSelective: 3470802, property: 0, severance: 187105, otherTaxes: 754470, charges: 6129792, lottery: 255778, royalties: 201345, otherMisc: 3211696 },
  CT: { total: 39200261, federal: 11598668, localGrants: 12317, incomeIndividual: 10034028, incomeCorporate: 3203013, salesGeneral: 6231910, salesSelective: 2946006, property: 0, severance: 0, otherTaxes: 798121, charges: 2954135, lottery: 473119, royalties: 3639, otherMisc: 945305 },
  DE: { total: 13629917, federal: 3945037, localGrants: 71884, incomeIndividual: 2533018, incomeCorporate: 537846, salesGeneral: 0, salesSelective: 658914, property: 0, severance: 0, otherTaxes: 2804584, charges: 1228415, lottery: 144019, royalties: 0, otherMisc: 1706200 },
  FL: { total: 142073837, federal: 48941299, localGrants: 392691, incomeIndividual: 0, incomeCorporate: 6045890, salesGeneral: 40089443, salesSelective: 10412278, property: 0, severance: 21953, otherTaxes: 6518323, charges: 15423249, lottery: 2591246, royalties: 0, otherMisc: 11637465 },
  GA: { total: 67228210, federal: 25597252, localGrants: 60381, incomeIndividual: 16020674, incomeCorporate: 3614953, salesGeneral: 9014691, salesSelective: 3306864, property: 862884, severance: 0, otherTaxes: 824221, charges: 4772073, lottery: 1563473, royalties: 67, otherMisc: 1590677 },
  HI: { total: 20089770, federal: 4821266, localGrants: 467806, incomeIndividual: 3280508, incomeCorporate: 514588, salesGeneral: 4787835, salesSelective: 1507021, property: 0, severance: 0, otherTaxes: 484107, charges: 2067485, lottery: 0, royalties: 0, otherMisc: 2159154 },
  IA: { total: 31874540, federal: 10399865, localGrants: 45559, incomeIndividual: 3760179, incomeCorporate: 1533101, salesGeneral: 4635715, salesSelective: 1605502, property: 837, severance: 0, otherTaxes: 1206666, charges: 5614852, lottery: 145393, royalties: 579, otherMisc: 2926292 },
  ID: { total: 15374990, federal: 4504985, localGrants: 23975, incomeIndividual: 2885574, incomeCorporate: 1170681, salesGeneral: 3090372, salesSelective: 668037, property: 0, severance: 6009, otherTaxes: 510376, charges: 1496562, lottery: 102088, royalties: 2820, otherMisc: 913511 },
  IL: { total: 117612047, federal: 35946356, localGrants: 773923, incomeIndividual: 22629801, incomeCorporate: 11895906, salesGeneral: 16048964, salesSelective: 11618874, property: 73342, severance: 0, otherTaxes: 4653357, charges: 6161427, lottery: 1277228, royalties: 0, otherMisc: 6532869 },
  IN: { total: 57250709, federal: 23597758, localGrants: 171829, incomeIndividual: 8096200, incomeCorporate: 965129, salesGeneral: 10959429, salesSelective: 5197175, property: 15285, severance: 1235, otherTaxes: 889114, charges: 4401640, lottery: 484308, royalties: 622, otherMisc: 2470985 },
  KS: { total: 28742832, federal: 7146373, localGrants: 51901, incomeIndividual: 4503615, incomeCorporate: 1465780, salesGeneral: 4332249, salesSelective: 1325482, property: 952523, severance: 35044, otherTaxes: 452958, charges: 6522231, lottery: 105972, royalties: 547, otherMisc: 1848157 },
  KY: { total: 48488866, federal: 21477853, localGrants: 57378, incomeIndividual: 5015585, incomeCorporate: 2041051, salesGeneral: 5802582, salesSelective: 2783225, property: 808162, severance: 115049, otherTaxes: 655232, charges: 6980066, lottery: 493713, royalties: 0, otherMisc: 2258970 },
  LA: { total: 44100401, federal: 22372434, localGrants: 578011, incomeIndividual: 4882451, incomeCorporate: 1014529, salesGeneral: 4868390, salesSelective: 3259027, property: 131236, severance: 828612, otherTaxes: 970899, charges: 2549253, lottery: 305229, royalties: 160696, otherMisc: 2179634 },
  MA: { total: 81884998, federal: 24381548, localGrants: 673186, incomeIndividual: 22134838, incomeCorporate: 6290604, salesGeneral: 9396274, salesSelective: 2905927, property: 15416, severance: 0, otherTaxes: 2337913, charges: 6192794, lottery: 1601032, royalties: 0, otherMisc: 5955466 },
  MD: { total: 60057573, federal: 20381205, localGrants: 158103, incomeIndividual: 10647833, incomeCorporate: 4849046, salesGeneral: 6853213, salesSelective: 5819812, property: 994776, severance: 0, otherTaxes: 1747023, charges: 4410534, lottery: 796223, royalties: 0, otherMisc: 3399805 },
  ME: { total: 13435675, federal: 5108942, localGrants: 24228, incomeIndividual: 2398949, incomeCorporate: 459753, salesGeneral: 2352375, salesSelective: 843861, property: 39993, severance: 0, otherTaxes: 414142, charges: 1085377, lottery: 109680, royalties: 0, otherMisc: 598375 },
  MI: { total: 91311250, federal: 33563705, localGrants: 279278, incomeIndividual: 11364943, incomeCorporate: 2812561, salesGeneral: 12701637, salesSelective: 5380685, property: 2592924, severance: 26655, otherTaxes: 2692941, charges: 14045326, lottery: 1294383, royalties: 17559, otherMisc: 4538653 },
  MN: { total: 62986323, federal: 19521008, localGrants: 249129, incomeIndividual: 13274070, incomeCorporate: 5875471, salesGeneral: 8493198, salesSelective: 5082728, property: 731865, severance: 76558, otherTaxes: 2133089, charges: 3165966, lottery: 226772, royalties: 29957, otherMisc: 4126512 },
  MO: { total: 46053934, federal: 19901597, localGrants: 228191, incomeIndividual: 7747560, incomeCorporate: 1652525, salesGeneral: 5258805, salesSelective: 2324427, property: 46136, severance: 0, otherTaxes: 760243, charges: 4298955, lottery: 422279, royalties: 0, otherMisc: 3413216 },
  MS: { total: 27147790, federal: 11394309, localGrants: 44518, incomeIndividual: 2327803, incomeCorporate: 717797, salesGeneral: 5073044, salesSelective: 1772532, property: 30361, severance: 49152, otherTaxes: 631900, charges: 3072038, lottery: 217350, royalties: 0, otherMisc: 1816986 },
  MT: { total: 10650431, federal: 4658156, localGrants: 4675, incomeIndividual: 2246570, incomeCorporate: 310370, salesGeneral: 0, salesSelective: 902777, property: 481087, severance: 241180, otherTaxes: 541724, charges: 678570, lottery: 29101, royalties: 74440, otherMisc: 481781 },
  NC: { total: 87057751, federal: 31417578, localGrants: 1258088, incomeIndividual: 16664704, incomeCorporate: 1558772, salesGeneral: 12157182, salesSelective: 6017466, property: 0, severance: 2047, otherTaxes: 2724575, charges: 8903951, lottery: 1572861, royalties: 0, otherMisc: 4780527 },
  ND: { total: 11653859, federal: 2779920, localGrants: 59080, incomeIndividual: 356475, incomeCorporate: 256447, salesGeneral: 1320723, salesSelective: 561189, property: 5818, severance: 3095262, otherTaxes: 251794, charges: 1010206, lottery: 17525, royalties: 147187, otherMisc: 1792233 },
  NE: { total: 16979244, federal: 5905007, localGrants: 46274, incomeIndividual: 2482372, incomeCorporate: 1724908, salesGeneral: 2974813, salesSelective: 688390, property: 126, severance: 3683, otherTaxes: 230547, charges: 1151953, lottery: 106329, royalties: 1755, otherMisc: 1663087 },
  NH: { total: 9481490, federal: 3253344, localGrants: 524740, incomeIndividual: 183359, incomeCorporate: 1218620, salesGeneral: 0, salesSelective: 1020509, property: 410549, severance: 0, otherTaxes: 753262, charges: 912665, lottery: 222589, royalties: 0, otherMisc: 981853 },
  NJ: { total: 101034712, federal: 29707008, localGrants: 682830, incomeIndividual: 18622423, incomeCorporate: 8823975, salesGeneral: 14907632, salesSelective: 5962440, property: 4964, severance: 0, otherTaxes: 3516925, charges: 9350473, lottery: 1260567, royalties: 85, otherMisc: 8195390 },
  NM: { total: 39658425, federal: 12410980, localGrants: 590280, incomeIndividual: 2647960, incomeCorporate: 536265, salesGeneral: 4290935, salesSelective: 1053426, property: 125960, severance: 4437157, otherTaxes: 602344, charges: 4363157, lottery: 76684, royalties: 5161418, otherMisc: 3361859 },
  NV: { total: 26115147, federal: 8341552, localGrants: 203454, incomeIndividual: 0, incomeCorporate: 0, salesGeneral: 8408501, salesSelective: 3008965, property: 1816136, severance: 109778, otherTaxes: 1689934, charges: 927303, lottery: 0, royalties: 551, otherMisc: 1608973 },
  NY: { total: 253937934, federal: 100383728, localGrants: 1257136, incomeIndividual: 53840077, incomeCorporate: 23218037, salesGeneral: 19987219, salesSelective: 14963299, property: 0, severance: 0, otherTaxes: 7718405, charges: 15394689, lottery: 4035552, royalties: 18, otherMisc: 13139774 },
  OH: { total: 97873869, federal: 38386840, localGrants: 811221, incomeIndividual: 10020706, incomeCorporate: 213, salesGeneral: 16329461, salesSelective: 8960880, property: 0, severance: 60580, otherTaxes: 2094527, charges: 12310160, lottery: 1226196, royalties: 139, otherMisc: 7672946 },
  OK: { total: 34856121, federal: 14248989, localGrants: 170129, incomeIndividual: 4511353, incomeCorporate: 691278, salesGeneral: 3810916, salesSelective: 1819986, property: 0, severance: 1100599, otherTaxes: 1093194, charges: 3182119, lottery: 112548, royalties: 65028, otherMisc: 4049982 },
  OR: { total: 47903560, federal: 17561811, localGrants: 29813, incomeIndividual: 9538119, incomeCorporate: 1685221, salesGeneral: 1343988, salesSelective: 2875282, property: 20734, severance: 20354, otherTaxes: 1750270, charges: 8148884, lottery: 1058271, royalties: 0, otherMisc: 3870813 },
  PA: { total: 123418634, federal: 44487280, localGrants: 58550, incomeIndividual: 17079032, incomeCorporate: 4956531, salesGeneral: 15599908, salesSelective: 12010122, property: 44073, severance: 0, otherTaxes: 5508361, charges: 15226134, lottery: 1219689, royalties: 162296, otherMisc: 7066658 },
  RI: { total: 12383671, federal: 4557816, localGrants: 109796, incomeIndividual: 1602020, incomeCorporate: 595576, salesGeneral: 1633931, salesSelective: 1207247, property: 5364, severance: 0, otherTaxes: 233310, charges: 1226290, lottery: 393386, royalties: 0, otherMisc: 818935 },
  SC: { total: 45667923, federal: 14984086, localGrants: 278639, incomeIndividual: 6145430, incomeCorporate: 1351161, salesGeneral: 6438590, salesSelective: 3059079, property: 92821, severance: 0, otherTaxes: 939414, charges: 9059554, lottery: 644902, royalties: 68, otherMisc: 2674179 },
  SD: { total: 6814690, federal: 2835330, localGrants: 53511, incomeIndividual: 0, incomeCorporate: 60718, salesGeneral: 1677538, salesSelective: 580557, property: 0, severance: 10933, otherTaxes: 348686, charges: 374475, lottery: 195765, royalties: 0, otherMisc: 677177 },
  TN: { total: 49548720, federal: 20054233, localGrants: 116649, incomeIndividual: 2123, incomeCorporate: 3048569, salesGeneral: 14080043, salesSelective: 4077126, property: 0, severance: 529, otherTaxes: 2951406, charges: 2858972, lottery: 680764, royalties: 0, otherMisc: 1678306 },
  TX: { total: 208118887, federal: 68449127, localGrants: 4679788, incomeIndividual: 0, incomeCorporate: 0, salesGeneral: 54345269, salesSelective: 20584699, property: 0, severance: 8596027, otherTaxes: 3810705, charges: 24121544, lottery: 2734293, royalties: 1668103, otherMisc: 19129332 },
  UT: { total: 31637710, federal: 8462642, localGrants: 5216, incomeIndividual: 5719610, incomeCorporate: 1449946, salesGeneral: 4632048, salesSelective: 1087062, property: 0, severance: 97887, otherTaxes: 451279, charges: 7286657, lottery: 0, royalties: 56588, otherMisc: 2388775 },
  VA: { total: 83190356, federal: 22202902, localGrants: 1263130, incomeIndividual: 17637351, incomeCorporate: 3836386, salesGeneral: 7395083, salesSelective: 6921480, property: 45114, severance: 5866, otherTaxes: 1819864, charges: 13750393, lottery: 1053180, royalties: 1218, otherMisc: 7258389 },
  VT: { total: 8931238, federal: 3017050, localGrants: 568, incomeIndividual: 1243069, incomeCorporate: 255401, salesGeneral: 597330, salesSelective: 946763, property: 1307255, severance: 0, otherTaxes: 290931, charges: 642840, lottery: 67270, royalties: 0, otherMisc: 562761 },
  WA: { total: 73885239, federal: 22327676, localGrants: 526663, incomeIndividual: 350447, incomeCorporate: 0, salesGeneral: 22806921, salesSelective: 5560460, property: 4614073, severance: 40961, otherTaxes: 3969193, charges: 8025262, lottery: 293341, royalties: 0, otherMisc: 5370242 },
  WI: { total: 51825964, federal: 15315079, localGrants: 283238, incomeIndividual: 9873656, incomeCorporate: 3370905, salesGeneral: 7747108, salesSelective: 2894325, property: 104756, severance: 2024, otherTaxes: 1503302, charges: 5895077, lottery: 316886, royalties: 0, otherMisc: 4519608 },
  WV: { total: 18470184, federal: 7512448, localGrants: 99896, incomeIndividual: 2269859, incomeCorporate: 465463, salesGeneral: 1816544, salesSelective: 1730050, property: 9350, severance: 422363, otherTaxes: 269489, charges: 1842681, lottery: 560973, royalties: 16080, otherMisc: 1454988 },
  WY: { total: 7716733, federal: 3094475, localGrants: 23521, incomeIndividual: 0, incomeCorporate: 0, salesGeneral: 1011860, salesSelective: 211829, property: 401751, severance: 794352, otherTaxes: 219936, charges: 352843, lottery: 16314, royalties: 117186, otherMisc: 1472666 },
};
