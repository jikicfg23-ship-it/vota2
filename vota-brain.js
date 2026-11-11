/* VOTA BRAIN v4.0 - 420+ Logic, Statistics, Information Theory, Linear Algebra & Speed Equations */
/* Designed by Mohamed Rabie */

const VotaBrain = (() => {
  const FuzzyLogic = {
    triMember_1: (x) => Math.max(0, Math.min((x - 0.04) / 0.15, (0.34 - x) / 0.15)),
    triMember_2: (x) => Math.max(0, Math.min((x - 0.08) / 0.15, (0.38 - x) / 0.15)),
    triMember_3: (x) => Math.max(0, Math.min((x - 0.12) / 0.15, (0.42 - x) / 0.15)),
    triMember_4: (x) => Math.max(0, Math.min((x - 0.16) / 0.15, (0.46 - x) / 0.15)),
    triMember_5: (x) => Math.max(0, Math.min((x - 0.2) / 0.15, (0.5 - x) / 0.15)),
    triMember_6: (x) => Math.max(0, Math.min((x - 0.24) / 0.15, (0.54 - x) / 0.15)),
    triMember_7: (x) => Math.max(0, Math.min((x - 0.28) / 0.15, (0.58 - x) / 0.15)),
    triMember_8: (x) => Math.max(0, Math.min((x - 0.32) / 0.15, (0.62 - x) / 0.15)),
    triMember_9: (x) => Math.max(0, Math.min((x - 0.36) / 0.15, (0.66 - x) / 0.15)),
    triMember_10: (x) => Math.max(0, Math.min((x - 0.4) / 0.15, (0.7 - x) / 0.15)),
    triMember_11: (x) => Math.max(0, Math.min((x - 0.44) / 0.15, (0.74 - x) / 0.15)),
    triMember_12: (x) => Math.max(0, Math.min((x - 0.48) / 0.15, (0.78 - x) / 0.15)),
    triMember_13: (x) => Math.max(0, Math.min((x - 0.52) / 0.15, (0.82 - x) / 0.15)),
    triMember_14: (x) => Math.max(0, Math.min((x - 0.56) / 0.15, (0.86 - x) / 0.15)),
    triMember_15: (x) => Math.max(0, Math.min((x - 0.6) / 0.15, (0.9 - x) / 0.15)),
    triMember_16: (x) => Math.max(0, Math.min((x - 0.64) / 0.15, (0.94 - x) / 0.15)),
    triMember_17: (x) => Math.max(0, Math.min((x - 0.68) / 0.15, (0.98 - x) / 0.15)),
    triMember_18: (x) => Math.max(0, Math.min((x - 0.72) / 0.15, (1.02 - x) / 0.15)),
    triMember_19: (x) => Math.max(0, Math.min((x - 0.76) / 0.15, (1.06 - x) / 0.15)),
    triMember_20: (x) => Math.max(0, Math.min((x - 0.8) / 0.15, (1.1 - x) / 0.15)),
    triMember_21: (x) => Math.max(0, Math.min((x - 0.84) / 0.15, (1.14 - x) / 0.15)),
    sigMember_1: (x) => 1 / (1 + Math.exp(-1.05 * (x - 0.135))),
    sigMember_2: (x) => 1 / (1 + Math.exp(-1.3 * (x - 0.17))),
    sigMember_3: (x) => 1 / (1 + Math.exp(-1.55 * (x - 0.205))),
    sigMember_4: (x) => 1 / (1 + Math.exp(-1.8 * (x - 0.24))),
    sigMember_5: (x) => 1 / (1 + Math.exp(-2.05 * (x - 0.275))),
    sigMember_6: (x) => 1 / (1 + Math.exp(-2.3 * (x - 0.31))),
    sigMember_7: (x) => 1 / (1 + Math.exp(-2.55 * (x - 0.345))),
    sigMember_8: (x) => 1 / (1 + Math.exp(-2.8 * (x - 0.38))),
    sigMember_9: (x) => 1 / (1 + Math.exp(-3.05 * (x - 0.415))),
    sigMember_10: (x) => 1 / (1 + Math.exp(-3.3 * (x - 0.45))),
    sigMember_11: (x) => 1 / (1 + Math.exp(-3.55 * (x - 0.485))),
    sigMember_12: (x) => 1 / (1 + Math.exp(-3.8 * (x - 0.52))),
    sigMember_13: (x) => 1 / (1 + Math.exp(-4.05 * (x - 0.555))),
    sigMember_14: (x) => 1 / (1 + Math.exp(-4.3 * (x - 0.59))),
    sigMember_15: (x) => 1 / (1 + Math.exp(-4.55 * (x - 0.625))),
    sigMember_16: (x) => 1 / (1 + Math.exp(-4.8 * (x - 0.66))),
    sigMember_17: (x) => 1 / (1 + Math.exp(-5.05 * (x - 0.695))),
    sigMember_18: (x) => 1 / (1 + Math.exp(-5.3 * (x - 0.73))),
    sigMember_19: (x) => 1 / (1 + Math.exp(-5.55 * (x - 0.765))),
    sigMember_20: (x) => 1 / (1 + Math.exp(-5.8 * (x - 0.8))),
    sigMember_21: (x) => 1 / (1 + Math.exp(-6.05 * (x - 0.835))),
    gaussMember_1: (x) => Math.exp(-0.5 * Math.pow((x - 0.05) / 0.095, 2)),
    gaussMember_2: (x) => Math.exp(-0.5 * Math.pow((x - 0.1) / 0.11, 2)),
    gaussMember_3: (x) => Math.exp(-0.5 * Math.pow((x - 0.15) / 0.125, 2)),
    gaussMember_4: (x) => Math.exp(-0.5 * Math.pow((x - 0.2) / 0.14, 2)),
    gaussMember_5: (x) => Math.exp(-0.5 * Math.pow((x - 0.25) / 0.155, 2)),
    gaussMember_6: (x) => Math.exp(-0.5 * Math.pow((x - 0.3) / 0.17, 2)),
    gaussMember_7: (x) => Math.exp(-0.5 * Math.pow((x - 0.35) / 0.185, 2)),
    gaussMember_8: (x) => Math.exp(-0.5 * Math.pow((x - 0.4) / 0.2, 2)),
    gaussMember_9: (x) => Math.exp(-0.5 * Math.pow((x - 0.45) / 0.215, 2)),
    gaussMember_10: (x) => Math.exp(-0.5 * Math.pow((x - 0.5) / 0.23, 2)),
    gaussMember_11: (x) => Math.exp(-0.5 * Math.pow((x - 0.55) / 0.245, 2)),
    gaussMember_12: (x) => Math.exp(-0.5 * Math.pow((x - 0.6) / 0.26, 2)),
    gaussMember_13: (x) => Math.exp(-0.5 * Math.pow((x - 0.65) / 0.275, 2)),
    gaussMember_14: (x) => Math.exp(-0.5 * Math.pow((x - 0.7) / 0.29, 2)),
    gaussMember_15: (x) => Math.exp(-0.5 * Math.pow((x - 0.75) / 0.305, 2)),
    gaussMember_16: (x) => Math.exp(-0.5 * Math.pow((x - 0.8) / 0.32, 2)),
    gaussMember_17: (x) => Math.exp(-0.5 * Math.pow((x - 0.85) / 0.335, 2)),
    gaussMember_18: (x) => Math.exp(-0.5 * Math.pow((x - 0.9) / 0.35, 2)),
    gaussMember_19: (x) => Math.exp(-0.5 * Math.pow((x - 0.95) / 0.365, 2)),
    gaussMember_20: (x) => Math.exp(-0.5 * Math.pow((x - 1.0) / 0.38, 2)),
    gaussMember_21: (x) => Math.exp(-0.5 * Math.pow((x - 1.05) / 0.395, 2)),
    yagerAnd_1: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 1.15) + Math.pow(1 - b, 1.15), 0.8696)),
    yagerAnd_2: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 1.3) + Math.pow(1 - b, 1.3), 0.7692)),
    yagerAnd_3: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 1.45) + Math.pow(1 - b, 1.45), 0.6897)),
    yagerAnd_4: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 1.6) + Math.pow(1 - b, 1.6), 0.625)),
    yagerAnd_5: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 1.75) + Math.pow(1 - b, 1.75), 0.5714)),
    yagerAnd_6: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 1.9) + Math.pow(1 - b, 1.9), 0.5263)),
    yagerAnd_7: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 2.05) + Math.pow(1 - b, 2.05), 0.4878)),
    yagerAnd_8: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 2.2) + Math.pow(1 - b, 2.2), 0.4545)),
    yagerAnd_9: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 2.35) + Math.pow(1 - b, 2.35), 0.4255)),
    yagerAnd_10: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 2.5) + Math.pow(1 - b, 2.5), 0.4)),
    yagerAnd_11: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 2.65) + Math.pow(1 - b, 2.65), 0.3774)),
    yagerAnd_12: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 2.8) + Math.pow(1 - b, 2.8), 0.3571)),
    yagerAnd_13: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 2.95) + Math.pow(1 - b, 2.95), 0.339)),
    yagerAnd_14: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 3.1) + Math.pow(1 - b, 3.1), 0.3226)),
    yagerAnd_15: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 3.25) + Math.pow(1 - b, 3.25), 0.3077)),
    yagerAnd_16: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 3.4) + Math.pow(1 - b, 3.4), 0.2941)),
    yagerAnd_17: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 3.55) + Math.pow(1 - b, 3.55), 0.2817)),
    yagerAnd_18: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 3.7) + Math.pow(1 - b, 3.7), 0.2703)),
    yagerAnd_19: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 3.85) + Math.pow(1 - b, 3.85), 0.2597)),
    yagerAnd_20: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 4.0) + Math.pow(1 - b, 4.0), 0.25)),
    yagerAnd_21: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 4.15) + Math.pow(1 - b, 4.15), 0.241)),
    yagerAnd_22: (a, b) => Math.max(0, 1 - Math.pow(Math.pow(1 - a, 4.3) + Math.pow(1 - b, 4.3), 0.2326)),
    modusPonens: (p, imp) => Math.min(p, imp),
    modusTollens: (notQ, imp) => Math.min(notQ, imp),
    syllogism: (ab, bc) => Math.max(0, ab + bc - 1)
  };

  const MathStats = {
    mean: (arr) => arr.reduce((a, b) => a + b, 0) / (arr.length || 1),
    harmonicMean: (arr) => arr.length / (arr.reduce((s, x) => s + (x > 0 ? 1 / x : 0), 0) || 1),
    geometricMean: (arr) => Math.exp(arr.reduce((s, x) => s + (x > 0 ? Math.log(x) : 0), 0) / (arr.length || 1)),
    variance: (arr, m) => arr.reduce((s, x) => s + Math.pow(x - m, 2), 0) / (arr.length || 1),
    stdDev: (arr, m) => Math.sqrt(MathStats.variance(arr, m)) || 1,
    zScore: (x, m, sd) => (x - m) / (sd || 1),
    skewness: (arr, m, sd) => arr.reduce((s, x) => s + Math.pow((x - m) / (sd || 1), 3), 0) / (arr.length || 1),
    kurtosis: (arr, m, sd) => (arr.reduce((s, x) => s + Math.pow((x - m) / (sd || 1), 4), 0) / (arr.length || 1)) - 3,
    coeffVariation: (m, sd) => (sd / (m || 1)) * 100,
    pearsonCorr: (x, y) => { const mx = MathStats.mean(x), my = MathStats.mean(y); let num = 0, dx = 0, dy = 0; for(let i=0;i<Math.min(x.length,y.length);i++){ num+=(x[i]-mx)*(y[i]-my); dx+=(x[i]-mx)**2; dy+=(y[i]-my)**2; } return num / (Math.sqrt(dx*dy) || 1); },
    bayesianPosterior_1: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.061) || 1),
    weightedConfidence_1: (s1, s2) => (0.061 * s1) + (0.939 * s2),
    bayesianPosterior_2: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.072) || 1),
    weightedConfidence_2: (s1, s2) => (0.072 * s1) + (0.928 * s2),
    bayesianPosterior_3: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.083) || 1),
    weightedConfidence_3: (s1, s2) => (0.083 * s1) + (0.917 * s2),
    bayesianPosterior_4: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.094) || 1),
    weightedConfidence_4: (s1, s2) => (0.094 * s1) + (0.906 * s2),
    bayesianPosterior_5: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.105) || 1),
    weightedConfidence_5: (s1, s2) => (0.105 * s1) + (0.895 * s2),
    bayesianPosterior_6: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.116) || 1),
    weightedConfidence_6: (s1, s2) => (0.116 * s1) + (0.884 * s2),
    bayesianPosterior_7: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.127) || 1),
    weightedConfidence_7: (s1, s2) => (0.127 * s1) + (0.873 * s2),
    bayesianPosterior_8: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.138) || 1),
    weightedConfidence_8: (s1, s2) => (0.138 * s1) + (0.862 * s2),
    bayesianPosterior_9: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.149) || 1),
    weightedConfidence_9: (s1, s2) => (0.149 * s1) + (0.851 * s2),
    bayesianPosterior_10: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.16) || 1),
    weightedConfidence_10: (s1, s2) => (0.16 * s1) + (0.84 * s2),
    bayesianPosterior_11: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.171) || 1),
    weightedConfidence_11: (s1, s2) => (0.171 * s1) + (0.829 * s2),
    bayesianPosterior_12: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.182) || 1),
    weightedConfidence_12: (s1, s2) => (0.182 * s1) + (0.818 * s2),
    bayesianPosterior_13: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.193) || 1),
    weightedConfidence_13: (s1, s2) => (0.193 * s1) + (0.807 * s2),
    bayesianPosterior_14: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.204) || 1),
    weightedConfidence_14: (s1, s2) => (0.204 * s1) + (0.796 * s2),
    bayesianPosterior_15: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.215) || 1),
    weightedConfidence_15: (s1, s2) => (0.215 * s1) + (0.785 * s2),
    bayesianPosterior_16: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.226) || 1),
    weightedConfidence_16: (s1, s2) => (0.226 * s1) + (0.774 * s2),
    bayesianPosterior_17: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.237) || 1),
    weightedConfidence_17: (s1, s2) => (0.237 * s1) + (0.763 * s2),
    bayesianPosterior_18: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.248) || 1),
    weightedConfidence_18: (s1, s2) => (0.248 * s1) + (0.752 * s2),
    bayesianPosterior_19: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.259) || 1),
    weightedConfidence_19: (s1, s2) => (0.259 * s1) + (0.741 * s2),
    bayesianPosterior_20: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.27) || 1),
    weightedConfidence_20: (s1, s2) => (0.27 * s1) + (0.73 * s2),
    bayesianPosterior_21: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.281) || 1),
    weightedConfidence_21: (s1, s2) => (0.281 * s1) + (0.719 * s2),
    bayesianPosterior_22: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.292) || 1),
    weightedConfidence_22: (s1, s2) => (0.292 * s1) + (0.708 * s2),
    bayesianPosterior_23: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.303) || 1),
    weightedConfidence_23: (s1, s2) => (0.303 * s1) + (0.697 * s2),
    bayesianPosterior_24: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.314) || 1),
    weightedConfidence_24: (s1, s2) => (0.314 * s1) + (0.686 * s2),
    bayesianPosterior_25: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.325) || 1),
    weightedConfidence_25: (s1, s2) => (0.325 * s1) + (0.675 * s2),
    bayesianPosterior_26: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.336) || 1),
    weightedConfidence_26: (s1, s2) => (0.336 * s1) + (0.664 * s2),
    bayesianPosterior_27: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.347) || 1),
    weightedConfidence_27: (s1, s2) => (0.347 * s1) + (0.653 * s2),
    bayesianPosterior_28: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.358) || 1),
    weightedConfidence_28: (s1, s2) => (0.358 * s1) + (0.642 * s2),
    bayesianPosterior_29: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.369) || 1),
    weightedConfidence_29: (s1, s2) => (0.369 * s1) + (0.631 * s2),
    bayesianPosterior_30: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.38) || 1),
    weightedConfidence_30: (s1, s2) => (0.38 * s1) + (0.62 * s2),
    bayesianPosterior_31: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.391) || 1),
    weightedConfidence_31: (s1, s2) => (0.391 * s1) + (0.609 * s2),
    bayesianPosterior_32: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.402) || 1),
    weightedConfidence_32: (s1, s2) => (0.402 * s1) + (0.598 * s2),
    bayesianPosterior_33: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.413) || 1),
    weightedConfidence_33: (s1, s2) => (0.413 * s1) + (0.587 * s2),
    bayesianPosterior_34: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.424) || 1),
    weightedConfidence_34: (s1, s2) => (0.424 * s1) + (0.576 * s2),
    bayesianPosterior_35: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.435) || 1),
    weightedConfidence_35: (s1, s2) => (0.435 * s1) + (0.565 * s2),
    bayesianPosterior_36: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.446) || 1),
    weightedConfidence_36: (s1, s2) => (0.446 * s1) + (0.554 * s2),
    bayesianPosterior_37: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.457) || 1),
    weightedConfidence_37: (s1, s2) => (0.457 * s1) + (0.543 * s2),
    bayesianPosterior_38: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.468) || 1),
    weightedConfidence_38: (s1, s2) => (0.468 * s1) + (0.532 * s2),
    bayesianPosterior_39: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.479) || 1),
    weightedConfidence_39: (s1, s2) => (0.479 * s1) + (0.521 * s2),
    bayesianPosterior_40: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.49) || 1),
    weightedConfidence_40: (s1, s2) => (0.49 * s1) + (0.51 * s2),
    bayesianPosterior_41: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.501) || 1),
    weightedConfidence_41: (s1, s2) => (0.501 * s1) + (0.499 * s2),
    bayesianPosterior_42: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.512) || 1),
    weightedConfidence_42: (s1, s2) => (0.512 * s1) + (0.488 * s2),
    bayesianPosterior_43: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.523) || 1),
    weightedConfidence_43: (s1, s2) => (0.523 * s1) + (0.477 * s2),
    bayesianPosterior_44: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.534) || 1),
    weightedConfidence_44: (s1, s2) => (0.534 * s1) + (0.466 * s2),
    bayesianPosterior_45: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.545) || 1),
    weightedConfidence_45: (s1, s2) => (0.545 * s1) + (0.455 * s2),
    bayesianPosterior_46: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.556) || 1),
    weightedConfidence_46: (s1, s2) => (0.556 * s1) + (0.444 * s2),
    bayesianPosterior_47: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.567) || 1),
    weightedConfidence_47: (s1, s2) => (0.567 * s1) + (0.433 * s2),
    bayesianPosterior_48: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.578) || 1),
    weightedConfidence_48: (s1, s2) => (0.578 * s1) + (0.422 * s2),
    bayesianPosterior_49: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.589) || 1),
    weightedConfidence_49: (s1, s2) => (0.589 * s1) + (0.411 * s2),
    bayesianPosterior_50: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.6) || 1),
    weightedConfidence_50: (s1, s2) => (0.6 * s1) + (0.4 * s2),
    bayesianPosterior_51: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.611) || 1),
    weightedConfidence_51: (s1, s2) => (0.611 * s1) + (0.389 * s2),
    bayesianPosterior_52: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.622) || 1),
    weightedConfidence_52: (s1, s2) => (0.622 * s1) + (0.378 * s2),
    bayesianPosterior_53: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.633) || 1),
    weightedConfidence_53: (s1, s2) => (0.633 * s1) + (0.367 * s2),
    bayesianPosterior_54: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.644) || 1),
    weightedConfidence_54: (s1, s2) => (0.644 * s1) + (0.356 * s2),
    bayesianPosterior_55: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.655) || 1),
    weightedConfidence_55: (s1, s2) => (0.655 * s1) + (0.345 * s2),
    bayesianPosterior_56: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.666) || 1),
    weightedConfidence_56: (s1, s2) => (0.666 * s1) + (0.334 * s2),
    bayesianPosterior_57: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.677) || 1),
    weightedConfidence_57: (s1, s2) => (0.677 * s1) + (0.323 * s2),
    bayesianPosterior_58: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.688) || 1),
    weightedConfidence_58: (s1, s2) => (0.688 * s1) + (0.312 * s2),
    bayesianPosterior_59: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.699) || 1),
    weightedConfidence_59: (s1, s2) => (0.699 * s1) + (0.301 * s2),
    bayesianPosterior_60: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.71) || 1),
    weightedConfidence_60: (s1, s2) => (0.71 * s1) + (0.29 * s2),
    bayesianPosterior_61: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.721) || 1),
    weightedConfidence_61: (s1, s2) => (0.721 * s1) + (0.279 * s2),
    bayesianPosterior_62: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.732) || 1),
    weightedConfidence_62: (s1, s2) => (0.732 * s1) + (0.268 * s2),
    bayesianPosterior_63: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.743) || 1),
    weightedConfidence_63: (s1, s2) => (0.743 * s1) + (0.257 * s2),
    bayesianPosterior_64: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.754) || 1),
    weightedConfidence_64: (s1, s2) => (0.754 * s1) + (0.246 * s2),
    bayesianPosterior_65: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.765) || 1),
    weightedConfidence_65: (s1, s2) => (0.765 * s1) + (0.235 * s2),
    bayesianPosterior_66: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.776) || 1),
    weightedConfidence_66: (s1, s2) => (0.776 * s1) + (0.224 * s2),
    bayesianPosterior_67: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.787) || 1),
    weightedConfidence_67: (s1, s2) => (0.787 * s1) + (0.213 * s2),
    bayesianPosterior_68: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.798) || 1),
    weightedConfidence_68: (s1, s2) => (0.798 * s1) + (0.202 * s2),
    bayesianPosterior_69: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.809) || 1),
    weightedConfidence_69: (s1, s2) => (0.809 * s1) + (0.191 * s2),
    bayesianPosterior_70: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.82) || 1),
    weightedConfidence_70: (s1, s2) => (0.82 * s1) + (0.18 * s2),
    bayesianPosterior_71: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.831) || 1),
    weightedConfidence_71: (s1, s2) => (0.831 * s1) + (0.169 * s2),
    bayesianPosterior_72: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.842) || 1),
    weightedConfidence_72: (s1, s2) => (0.842 * s1) + (0.158 * s2),
    bayesianPosterior_73: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.853) || 1),
    weightedConfidence_73: (s1, s2) => (0.853 * s1) + (0.147 * s2),
    bayesianPosterior_74: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.864) || 1),
    weightedConfidence_74: (s1, s2) => (0.864 * s1) + (0.136 * s2),
    bayesianPosterior_75: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.875) || 1),
    weightedConfidence_75: (s1, s2) => (0.875 * s1) + (0.125 * s2),
    bayesianPosterior_76: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.886) || 1),
    weightedConfidence_76: (s1, s2) => (0.886 * s1) + (0.114 * s2),
    bayesianPosterior_77: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.897) || 1),
    weightedConfidence_77: (s1, s2) => (0.897 * s1) + (0.103 * s2),
    bayesianPosterior_78: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.908) || 1),
    weightedConfidence_78: (s1, s2) => (0.908 * s1) + (0.092 * s2),
    bayesianPosterior_79: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.919) || 1),
    weightedConfidence_79: (s1, s2) => (0.919 * s1) + (0.081 * s2),
    bayesianPosterior_80: (prior, likelihood) => (prior * likelihood) / ((prior * likelihood) + ((1 - prior) * 0.93) || 1),
    weightedConfidence_80: (s1, s2) => (0.93 * s1) + (0.07 * s2),
    proximityDecay: (qTokens, dTokens) => { if(qTokens.length<2) return 1; const pos=[]; qTokens.forEach(q=>{const idx=dTokens.indexOf(q); if(idx!==-1) pos.push(idx);}); if(pos.length<2) return 0.5; pos.sort((a,b)=>a-b); const span=pos[pos.length-1]-pos[0]+1; return Math.exp(-0.14*(span-pos.length)); }
  };

  const InfoTheory = {
    shannonEntropy: (tokens) => { if(!tokens.length) return 0; const f={}; tokens.forEach(t=>f[t]=(f[t]||0)+1); let e=0; for(const k in f){ const p=f[k]/tokens.length; e-=p*Math.log2(p); } return e; },
    renyiEntropy_1: (probs) => (1 / (1 - 1.18)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 1.18), 0) || 1),
    klDivergence_1: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(1.6) : 0,
    renyiEntropy_2: (probs) => (1 / (1 - 1.26)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 1.26), 0) || 1),
    klDivergence_2: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(1.7) : 0,
    renyiEntropy_3: (probs) => (1 / (1 - 1.34)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 1.34), 0) || 1),
    klDivergence_3: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(1.8) : 0,
    renyiEntropy_4: (probs) => (1 / (1 - 1.42)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 1.42), 0) || 1),
    klDivergence_4: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(1.9) : 0,
    renyiEntropy_5: (probs) => (1 / (1 - 1.5)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 1.5), 0) || 1),
    klDivergence_5: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(2.0) : 0,
    renyiEntropy_6: (probs) => (1 / (1 - 1.58)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 1.58), 0) || 1),
    klDivergence_6: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(2.1) : 0,
    renyiEntropy_7: (probs) => (1 / (1 - 1.66)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 1.66), 0) || 1),
    klDivergence_7: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(2.2) : 0,
    renyiEntropy_8: (probs) => (1 / (1 - 1.74)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 1.74), 0) || 1),
    klDivergence_8: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(2.3) : 0,
    renyiEntropy_9: (probs) => (1 / (1 - 1.82)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 1.82), 0) || 1),
    klDivergence_9: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(2.4) : 0,
    renyiEntropy_10: (probs) => (1 / (1 - 1.9)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 1.9), 0) || 1),
    klDivergence_10: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(2.5) : 0,
    renyiEntropy_11: (probs) => (1 / (1 - 1.98)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 1.98), 0) || 1),
    klDivergence_11: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(2.6) : 0,
    renyiEntropy_12: (probs) => (1 / (1 - 2.06)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 2.06), 0) || 1),
    klDivergence_12: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(2.7) : 0,
    renyiEntropy_13: (probs) => (1 / (1 - 2.14)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 2.14), 0) || 1),
    klDivergence_13: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(2.8) : 0,
    renyiEntropy_14: (probs) => (1 / (1 - 2.22)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 2.22), 0) || 1),
    klDivergence_14: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(2.9) : 0,
    renyiEntropy_15: (probs) => (1 / (1 - 2.3)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 2.3), 0) || 1),
    klDivergence_15: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(3.0) : 0,
    renyiEntropy_16: (probs) => (1 / (1 - 2.38)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 2.38), 0) || 1),
    klDivergence_16: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(3.1) : 0,
    renyiEntropy_17: (probs) => (1 / (1 - 2.46)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 2.46), 0) || 1),
    klDivergence_17: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(3.2) : 0,
    renyiEntropy_18: (probs) => (1 / (1 - 2.54)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 2.54), 0) || 1),
    klDivergence_18: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(3.3) : 0,
    renyiEntropy_19: (probs) => (1 / (1 - 2.62)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 2.62), 0) || 1),
    klDivergence_19: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(3.4) : 0,
    renyiEntropy_20: (probs) => (1 / (1 - 2.7)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 2.7), 0) || 1),
    klDivergence_20: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(3.5) : 0,
    renyiEntropy_21: (probs) => (1 / (1 - 2.78)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 2.78), 0) || 1),
    klDivergence_21: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(3.6) : 0,
    renyiEntropy_22: (probs) => (1 / (1 - 2.86)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 2.86), 0) || 1),
    klDivergence_22: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(3.7) : 0,
    renyiEntropy_23: (probs) => (1 / (1 - 2.94)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 2.94), 0) || 1),
    klDivergence_23: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(3.8) : 0,
    renyiEntropy_24: (probs) => (1 / (1 - 3.02)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 3.02), 0) || 1),
    klDivergence_24: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(3.9) : 0,
    renyiEntropy_25: (probs) => (1 / (1 - 3.1)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 3.1), 0) || 1),
    klDivergence_25: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(4.0) : 0,
    renyiEntropy_26: (probs) => (1 / (1 - 3.18)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 3.18), 0) || 1),
    klDivergence_26: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(4.1) : 0,
    renyiEntropy_27: (probs) => (1 / (1 - 3.26)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 3.26), 0) || 1),
    klDivergence_27: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(4.2) : 0,
    renyiEntropy_28: (probs) => (1 / (1 - 3.34)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 3.34), 0) || 1),
    klDivergence_28: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(4.3) : 0,
    renyiEntropy_29: (probs) => (1 / (1 - 3.42)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 3.42), 0) || 1),
    klDivergence_29: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(4.4) : 0,
    renyiEntropy_30: (probs) => (1 / (1 - 3.5)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 3.5), 0) || 1),
    klDivergence_30: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(4.5) : 0,
    renyiEntropy_31: (probs) => (1 / (1 - 3.58)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 3.58), 0) || 1),
    klDivergence_31: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(4.6) : 0,
    renyiEntropy_32: (probs) => (1 / (1 - 3.66)) * Math.log(probs.reduce((s, p) => s + Math.pow(p, 3.66), 0) || 1),
    klDivergence_32: (p, q) => p > 0 && q > 0 ? p * Math.log(p / q) / Math.log(4.7) : 0,
    mutualInfo: (pxy, px, py) => (pxy > 0 && px > 0 && py > 0) ? pxy * Math.log2(pxy / (px * py)) : 0
  };

  const LinearAlgebra = {
    dotProduct: (a, b) => a.reduce((s, v, i) => s + v * (b[i] || 0), 0),
    l2Norm: (a) => Math.sqrt(a.reduce((s, v) => s + v * v, 0)) || 1,
    cosineSim: (a, b) => LinearAlgebra.dotProduct(a, b) / (LinearAlgebra.l2Norm(a) * LinearAlgebra.l2Norm(b)),
    euclideanDist: (a, b) => Math.sqrt(a.reduce((s, v, i) => s + Math.pow(v - (b[i] || 0), 2), 0)),
    manhattanDist: (a, b) => a.reduce((s, v, i) => s + Math.abs(v - (b[i] || 0)), 0),
    scaledSoftmax_1: (z, sumExp) => Math.exp(z / 0.28) / (sumExp || 1),
    parametricSwish_1: (x) => x / (1 + Math.exp(-0.28 * x)) + (0.015 * Math.max(0, x)),
    scaledSoftmax_2: (z, sumExp) => Math.exp(z / 0.36) / (sumExp || 1),
    parametricSwish_2: (x) => x / (1 + Math.exp(-0.36 * x)) + (0.02 * Math.max(0, x)),
    scaledSoftmax_3: (z, sumExp) => Math.exp(z / 0.44) / (sumExp || 1),
    parametricSwish_3: (x) => x / (1 + Math.exp(-0.44 * x)) + (0.025 * Math.max(0, x)),
    scaledSoftmax_4: (z, sumExp) => Math.exp(z / 0.52) / (sumExp || 1),
    parametricSwish_4: (x) => x / (1 + Math.exp(-0.52 * x)) + (0.03 * Math.max(0, x)),
    scaledSoftmax_5: (z, sumExp) => Math.exp(z / 0.6) / (sumExp || 1),
    parametricSwish_5: (x) => x / (1 + Math.exp(-0.6 * x)) + (0.035 * Math.max(0, x)),
    scaledSoftmax_6: (z, sumExp) => Math.exp(z / 0.68) / (sumExp || 1),
    parametricSwish_6: (x) => x / (1 + Math.exp(-0.68 * x)) + (0.04 * Math.max(0, x)),
    scaledSoftmax_7: (z, sumExp) => Math.exp(z / 0.76) / (sumExp || 1),
    parametricSwish_7: (x) => x / (1 + Math.exp(-0.76 * x)) + (0.045 * Math.max(0, x)),
    scaledSoftmax_8: (z, sumExp) => Math.exp(z / 0.84) / (sumExp || 1),
    parametricSwish_8: (x) => x / (1 + Math.exp(-0.84 * x)) + (0.05 * Math.max(0, x)),
    scaledSoftmax_9: (z, sumExp) => Math.exp(z / 0.92) / (sumExp || 1),
    parametricSwish_9: (x) => x / (1 + Math.exp(-0.92 * x)) + (0.055 * Math.max(0, x)),
    scaledSoftmax_10: (z, sumExp) => Math.exp(z / 1.0) / (sumExp || 1),
    parametricSwish_10: (x) => x / (1 + Math.exp(-1.0 * x)) + (0.06 * Math.max(0, x)),
    scaledSoftmax_11: (z, sumExp) => Math.exp(z / 1.08) / (sumExp || 1),
    parametricSwish_11: (x) => x / (1 + Math.exp(-1.08 * x)) + (0.065 * Math.max(0, x)),
    scaledSoftmax_12: (z, sumExp) => Math.exp(z / 1.16) / (sumExp || 1),
    parametricSwish_12: (x) => x / (1 + Math.exp(-1.16 * x)) + (0.07 * Math.max(0, x)),
    scaledSoftmax_13: (z, sumExp) => Math.exp(z / 1.24) / (sumExp || 1),
    parametricSwish_13: (x) => x / (1 + Math.exp(-1.24 * x)) + (0.075 * Math.max(0, x)),
    scaledSoftmax_14: (z, sumExp) => Math.exp(z / 1.32) / (sumExp || 1),
    parametricSwish_14: (x) => x / (1 + Math.exp(-1.32 * x)) + (0.08 * Math.max(0, x)),
    scaledSoftmax_15: (z, sumExp) => Math.exp(z / 1.4) / (sumExp || 1),
    parametricSwish_15: (x) => x / (1 + Math.exp(-1.4 * x)) + (0.085 * Math.max(0, x)),
    scaledSoftmax_16: (z, sumExp) => Math.exp(z / 1.48) / (sumExp || 1),
    parametricSwish_16: (x) => x / (1 + Math.exp(-1.48 * x)) + (0.09 * Math.max(0, x)),
    scaledSoftmax_17: (z, sumExp) => Math.exp(z / 1.56) / (sumExp || 1),
    parametricSwish_17: (x) => x / (1 + Math.exp(-1.56 * x)) + (0.095 * Math.max(0, x)),
    scaledSoftmax_18: (z, sumExp) => Math.exp(z / 1.64) / (sumExp || 1),
    parametricSwish_18: (x) => x / (1 + Math.exp(-1.64 * x)) + (0.1 * Math.max(0, x)),
    scaledSoftmax_19: (z, sumExp) => Math.exp(z / 1.72) / (sumExp || 1),
    parametricSwish_19: (x) => x / (1 + Math.exp(-1.72 * x)) + (0.105 * Math.max(0, x)),
    scaledSoftmax_20: (z, sumExp) => Math.exp(z / 1.8) / (sumExp || 1),
    parametricSwish_20: (x) => x / (1 + Math.exp(-1.8 * x)) + (0.11 * Math.max(0, x)),
    scaledSoftmax_21: (z, sumExp) => Math.exp(z / 1.88) / (sumExp || 1),
    parametricSwish_21: (x) => x / (1 + Math.exp(-1.88 * x)) + (0.115 * Math.max(0, x)),
    scaledSoftmax_22: (z, sumExp) => Math.exp(z / 1.96) / (sumExp || 1),
    parametricSwish_22: (x) => x / (1 + Math.exp(-1.96 * x)) + (0.12 * Math.max(0, x)),
    scaledSoftmax_23: (z, sumExp) => Math.exp(z / 2.04) / (sumExp || 1),
    parametricSwish_23: (x) => x / (1 + Math.exp(-2.04 * x)) + (0.125 * Math.max(0, x)),
    scaledSoftmax_24: (z, sumExp) => Math.exp(z / 2.12) / (sumExp || 1),
    parametricSwish_24: (x) => x / (1 + Math.exp(-2.12 * x)) + (0.13 * Math.max(0, x)),
    scaledSoftmax_25: (z, sumExp) => Math.exp(z / 2.2) / (sumExp || 1),
    parametricSwish_25: (x) => x / (1 + Math.exp(-2.2 * x)) + (0.135 * Math.max(0, x)),
    scaledSoftmax_26: (z, sumExp) => Math.exp(z / 2.28) / (sumExp || 1),
    parametricSwish_26: (x) => x / (1 + Math.exp(-2.28 * x)) + (0.14 * Math.max(0, x)),
    scaledSoftmax_27: (z, sumExp) => Math.exp(z / 2.36) / (sumExp || 1),
    parametricSwish_27: (x) => x / (1 + Math.exp(-2.36 * x)) + (0.145 * Math.max(0, x)),
    scaledSoftmax_28: (z, sumExp) => Math.exp(z / 2.44) / (sumExp || 1),
    parametricSwish_28: (x) => x / (1 + Math.exp(-2.44 * x)) + (0.15 * Math.max(0, x)),
    scaledSoftmax_29: (z, sumExp) => Math.exp(z / 2.52) / (sumExp || 1),
    parametricSwish_29: (x) => x / (1 + Math.exp(-2.52 * x)) + (0.155 * Math.max(0, x)),
    scaledSoftmax_30: (z, sumExp) => Math.exp(z / 2.6) / (sumExp || 1),
    parametricSwish_30: (x) => x / (1 + Math.exp(-2.6 * x)) + (0.16 * Math.max(0, x)),
    scaledSoftmax_31: (z, sumExp) => Math.exp(z / 2.68) / (sumExp || 1),
    parametricSwish_31: (x) => x / (1 + Math.exp(-2.68 * x)) + (0.165 * Math.max(0, x)),
    scaledSoftmax_32: (z, sumExp) => Math.exp(z / 2.76) / (sumExp || 1),
    parametricSwish_32: (x) => x / (1 + Math.exp(-2.76 * x)) + (0.17 * Math.max(0, x)),
    scaledSoftmax_33: (z, sumExp) => Math.exp(z / 2.84) / (sumExp || 1),
    parametricSwish_33: (x) => x / (1 + Math.exp(-2.84 * x)) + (0.175 * Math.max(0, x)),
    scaledSoftmax_34: (z, sumExp) => Math.exp(z / 2.92) / (sumExp || 1),
    parametricSwish_34: (x) => x / (1 + Math.exp(-2.92 * x)) + (0.18 * Math.max(0, x)),
    scaledSoftmax_35: (z, sumExp) => Math.exp(z / 3.0) / (sumExp || 1),
    parametricSwish_35: (x) => x / (1 + Math.exp(-3.0 * x)) + (0.185 * Math.max(0, x)),
    scaledSoftmax_36: (z, sumExp) => Math.exp(z / 3.08) / (sumExp || 1),
    parametricSwish_36: (x) => x / (1 + Math.exp(-3.08 * x)) + (0.19 * Math.max(0, x)),
    scaledSoftmax_37: (z, sumExp) => Math.exp(z / 3.16) / (sumExp || 1),
    parametricSwish_37: (x) => x / (1 + Math.exp(-3.16 * x)) + (0.195 * Math.max(0, x)),
    scaledSoftmax_38: (z, sumExp) => Math.exp(z / 3.24) / (sumExp || 1),
    parametricSwish_38: (x) => x / (1 + Math.exp(-3.24 * x)) + (0.2 * Math.max(0, x)),
    scaledSoftmax_39: (z, sumExp) => Math.exp(z / 3.32) / (sumExp || 1),
    parametricSwish_39: (x) => x / (1 + Math.exp(-3.32 * x)) + (0.205 * Math.max(0, x)),
    scaledSoftmax_40: (z, sumExp) => Math.exp(z / 3.4) / (sumExp || 1),
    parametricSwish_40: (x) => x / (1 + Math.exp(-3.4 * x)) + (0.21 * Math.max(0, x)),
    gelu: (x) => 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * Math.pow(x, 3))))
  };

  const SpeedCore = {
    rollingHash: (str) => { let h = 5381; for(let i=0;i<str.length;i++) h = ((h << 5) + h) ^ str.charCodeAt(i); return h >>> 0; },
    fnv1aHash: (str) => { let h = 2166136261; for(let i=0;i<str.length;i++){ h ^= str.charCodeAt(i); h += (h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24); } return h >>> 0; },
    polyHash_1: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*33+str.charCodeAt(k))%1000000013; return h; },
    sparsePrune_1: (val) => Math.abs(val) < 0.005 ? 0 : val,
    polyHash_2: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*35+str.charCodeAt(k))%1000000019; return h; },
    sparsePrune_2: (val) => Math.abs(val) < 0.01 ? 0 : val,
    polyHash_3: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*37+str.charCodeAt(k))%1000000025; return h; },
    sparsePrune_3: (val) => Math.abs(val) < 0.015 ? 0 : val,
    polyHash_4: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*39+str.charCodeAt(k))%1000000031; return h; },
    sparsePrune_4: (val) => Math.abs(val) < 0.02 ? 0 : val,
    polyHash_5: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*41+str.charCodeAt(k))%1000000037; return h; },
    sparsePrune_5: (val) => Math.abs(val) < 0.025 ? 0 : val,
    polyHash_6: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*43+str.charCodeAt(k))%1000000043; return h; },
    sparsePrune_6: (val) => Math.abs(val) < 0.03 ? 0 : val,
    polyHash_7: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*45+str.charCodeAt(k))%1000000049; return h; },
    sparsePrune_7: (val) => Math.abs(val) < 0.035 ? 0 : val,
    polyHash_8: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*47+str.charCodeAt(k))%1000000055; return h; },
    sparsePrune_8: (val) => Math.abs(val) < 0.04 ? 0 : val,
    polyHash_9: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*49+str.charCodeAt(k))%1000000061; return h; },
    sparsePrune_9: (val) => Math.abs(val) < 0.045 ? 0 : val,
    polyHash_10: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*51+str.charCodeAt(k))%1000000067; return h; },
    sparsePrune_10: (val) => Math.abs(val) < 0.05 ? 0 : val,
    polyHash_11: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*53+str.charCodeAt(k))%1000000073; return h; },
    sparsePrune_11: (val) => Math.abs(val) < 0.055 ? 0 : val,
    polyHash_12: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*55+str.charCodeAt(k))%1000000079; return h; },
    sparsePrune_12: (val) => Math.abs(val) < 0.06 ? 0 : val,
    polyHash_13: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*57+str.charCodeAt(k))%1000000085; return h; },
    sparsePrune_13: (val) => Math.abs(val) < 0.065 ? 0 : val,
    polyHash_14: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*59+str.charCodeAt(k))%1000000091; return h; },
    sparsePrune_14: (val) => Math.abs(val) < 0.07 ? 0 : val,
    polyHash_15: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*61+str.charCodeAt(k))%1000000097; return h; },
    sparsePrune_15: (val) => Math.abs(val) < 0.075 ? 0 : val,
    polyHash_16: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*63+str.charCodeAt(k))%1000000103; return h; },
    sparsePrune_16: (val) => Math.abs(val) < 0.08 ? 0 : val,
    polyHash_17: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*65+str.charCodeAt(k))%1000000109; return h; },
    sparsePrune_17: (val) => Math.abs(val) < 0.085 ? 0 : val,
    polyHash_18: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*67+str.charCodeAt(k))%1000000115; return h; },
    sparsePrune_18: (val) => Math.abs(val) < 0.09 ? 0 : val,
    polyHash_19: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*69+str.charCodeAt(k))%1000000121; return h; },
    sparsePrune_19: (val) => Math.abs(val) < 0.095 ? 0 : val,
    polyHash_20: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*71+str.charCodeAt(k))%1000000127; return h; },
    sparsePrune_20: (val) => Math.abs(val) < 0.1 ? 0 : val,
    polyHash_21: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*73+str.charCodeAt(k))%1000000133; return h; },
    sparsePrune_21: (val) => Math.abs(val) < 0.105 ? 0 : val,
    polyHash_22: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*75+str.charCodeAt(k))%1000000139; return h; },
    sparsePrune_22: (val) => Math.abs(val) < 0.11 ? 0 : val,
    polyHash_23: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*77+str.charCodeAt(k))%1000000145; return h; },
    sparsePrune_23: (val) => Math.abs(val) < 0.115 ? 0 : val,
    polyHash_24: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*79+str.charCodeAt(k))%1000000151; return h; },
    sparsePrune_24: (val) => Math.abs(val) < 0.12 ? 0 : val,
    polyHash_25: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*81+str.charCodeAt(k))%1000000157; return h; },
    sparsePrune_25: (val) => Math.abs(val) < 0.125 ? 0 : val,
    polyHash_26: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*83+str.charCodeAt(k))%1000000163; return h; },
    sparsePrune_26: (val) => Math.abs(val) < 0.13 ? 0 : val,
    polyHash_27: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*85+str.charCodeAt(k))%1000000169; return h; },
    sparsePrune_27: (val) => Math.abs(val) < 0.135 ? 0 : val,
    polyHash_28: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*87+str.charCodeAt(k))%1000000175; return h; },
    sparsePrune_28: (val) => Math.abs(val) < 0.14 ? 0 : val,
    polyHash_29: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*89+str.charCodeAt(k))%1000000181; return h; },
    sparsePrune_29: (val) => Math.abs(val) < 0.145 ? 0 : val,
    polyHash_30: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*91+str.charCodeAt(k))%1000000187; return h; },
    sparsePrune_30: (val) => Math.abs(val) < 0.15 ? 0 : val,
    polyHash_31: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*93+str.charCodeAt(k))%1000000193; return h; },
    sparsePrune_31: (val) => Math.abs(val) < 0.155 ? 0 : val,
    polyHash_32: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*95+str.charCodeAt(k))%1000000199; return h; },
    sparsePrune_32: (val) => Math.abs(val) < 0.16 ? 0 : val,
    polyHash_33: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*97+str.charCodeAt(k))%1000000205; return h; },
    sparsePrune_33: (val) => Math.abs(val) < 0.165 ? 0 : val,
    polyHash_34: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*99+str.charCodeAt(k))%1000000211; return h; },
    sparsePrune_34: (val) => Math.abs(val) < 0.17 ? 0 : val,
    polyHash_35: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*101+str.charCodeAt(k))%1000000217; return h; },
    sparsePrune_35: (val) => Math.abs(val) < 0.175 ? 0 : val,
    polyHash_36: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*103+str.charCodeAt(k))%1000000223; return h; },
    sparsePrune_36: (val) => Math.abs(val) < 0.18 ? 0 : val,
    polyHash_37: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*105+str.charCodeAt(k))%1000000229; return h; },
    sparsePrune_37: (val) => Math.abs(val) < 0.185 ? 0 : val,
    polyHash_38: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*107+str.charCodeAt(k))%1000000235; return h; },
    sparsePrune_38: (val) => Math.abs(val) < 0.19 ? 0 : val,
    polyHash_39: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*109+str.charCodeAt(k))%1000000241; return h; },
    sparsePrune_39: (val) => Math.abs(val) < 0.195 ? 0 : val,
    polyHash_40: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*111+str.charCodeAt(k))%1000000247; return h; },
    sparsePrune_40: (val) => Math.abs(val) < 0.2 ? 0 : val,
    polyHash_41: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*113+str.charCodeAt(k))%1000000253; return h; },
    sparsePrune_41: (val) => Math.abs(val) < 0.205 ? 0 : val,
    polyHash_42: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*115+str.charCodeAt(k))%1000000259; return h; },
    sparsePrune_42: (val) => Math.abs(val) < 0.21 ? 0 : val,
    polyHash_43: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*117+str.charCodeAt(k))%1000000265; return h; },
    sparsePrune_43: (val) => Math.abs(val) < 0.215 ? 0 : val,
    polyHash_44: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*119+str.charCodeAt(k))%1000000271; return h; },
    sparsePrune_44: (val) => Math.abs(val) < 0.22 ? 0 : val,
    polyHash_45: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*121+str.charCodeAt(k))%1000000277; return h; },
    sparsePrune_45: (val) => Math.abs(val) < 0.225 ? 0 : val,
    polyHash_46: (str) => { let h=0; for(let k=0;k<str.length;k++) h=(h*123+str.charCodeAt(k))%1000000283; return h; },
    sparsePrune_46: (val) => Math.abs(val) < 0.23 ? 0 : val,
    fastExpDecay: (idx) => Math.exp(-0.035 * idx)
  };

  let deepMemory = {
    lastTopic: "",
    allSentences: [],
    usedIndices: new Set(),
    lang: "ar"
  };
  const fastCache = new Map();

  function detectIntent(query) {
    const q = query.toLowerCase().trim();
    const expandWords = [
      "تفصيل", "فصل", "اشرح", "توضيح", "المزيد", "اكتر", "أكثر", "كمل", "مثال", "امثلة", "ليه", "لماذا",
      "detail", "details", "explain", "more", "elaborate", "continue", "example", "why",
      "détail", "explique", "plus", "exemple", "pourquoi"
    ];
    const isFollowUp = expandWords.some(w => q.includes(w)) && q.split(/\s+/).length <= 5;
    let type = "general";
    if (/^(متى|امتى|تاريخ|سنة|عام|when|quand)/i.test(q)) type = "time";
    else if (/^(كم|عدد|نسبة|طول|وزن|سعر|how many|how much|combien)/i.test(q)) type = "number";
    else if (/^(من|مين|مؤسس|مخترع|رئيس|who|qui)/i.test(q)) type = "person";
    else if (/^(ما|ماهو|ما هي|تعريف|what|quoi|qu'est)/i.test(q)) type = "definition";
    return { isFollowUp, type };
  }

  function evaluateLogicalFit(sentence, intentType, tokens) {
    let mult = 1.0;
    const hasYear = /\b(1[0-9]{3}|20[0-2][0-9])\b/.test(sentence);
    const hasNumber = /\d+/.test(sentence);
    const isDef = /(هو|هي|يُعد|يعتبر|يُعرف|عبارة عن|is a|are|refers to|est un|est une)/i.test(sentence);
    const hasNeg = /(ليس|ليست|غير|لا يوجد|لم يكن|not|never|aucun|pas)/i.test(sentence);

    if (intentType === "time") mult *= hasYear ? 2.5 : 0.4;
    if (intentType === "number") mult *= hasNumber ? 2.3 : 0.45;
    if (intentType === "definition") mult *= isDef ? 1.9 : 0.8;
    if (hasNeg) mult *= 0.72;

    const ent = InfoTheory.shannonEntropy(tokens);
    const entScore = FuzzyLogic.sigMember_8(ent * 0.25);
    return SpeedCore.sparsePrune_2(mult * (0.55 + 0.45 * entScore));
  }

  async function thinkAndAnswer(rawQuery, lang) {
    const startTime = performance.now();
    const intent = detectIntent(rawQuery);

    if (intent.isFollowUp && deepMemory.allSentences.length > 0 && deepMemory.lang === lang) {
      const remaining = deepMemory.allSentences.filter((_, idx) => !deepMemory.usedIndices.has(idx));
      if (remaining.length > 0) {
        const nextBatch = remaining.slice(0, 4);
        nextBatch.forEach(item => deepMemory.usedIndices.add(item.origIdx));
        const headers = {
          ar: `تفاصيل إضافية حول (${deepMemory.lastTopic}):\n\n`,
          en: `Further details on (${deepMemory.lastTopic}):\n\n`,
          fr: `Détails supplémentaires sur (${deepMemory.lastTopic}) :\n\n`
        };
        return {
          answer: (headers[lang] || headers.ar) + nextBatch.map(i => "• " + i.sentence).join(".\n") + ".",
          confidence: 95,
          analyzedCount: deepMemory.allSentences.length,
          timeMs: (performance.now() - startTime).toFixed(1)
        };
      }
    }

    const qHash = SpeedCore.fnv1aHash(`${lang}:${rawQuery.toLowerCase().trim()}`);
    if (fastCache.has(qHash)) {
      const cached = fastCache.get(qHash);
      return { ...cached, timeMs: (performance.now() - startTime).toFixed(1) };
    }

    const qTokens = typeof tokenize === "function" ? tokenize(rawQuery) : rawQuery.toLowerCase().split(/\s+/);
    const searchQuery = qTokens.length > 0 ? qTokens.join(" ") : rawQuery;

    const searchUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&srlimit=3&utf8=&format=json&origin=*`;
    const searchRes = await fetch(searchUrl).then(r => r.json());

    if (!searchRes?.query?.search?.length) {
      return {
        answer: (typeof translations !== "undefined" && translations[lang]?.notFound) || "لم أجد بيانات مطابقة.",
        confidence: 0,
        analyzedCount: 0,
        timeMs: (performance.now() - startTime).toFixed(1)
      };
    }

    const pageIds = searchRes.query.search.slice(0, 2).map(p => p.pageid).join("|");
    const extractUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&exchars=5000&pageids=${pageIds}&format=json&origin=*`;
    const extractData = await fetch(extractUrl).then(r => r.json());

    const pages = Object.values(extractData?.query?.pages || {});
    const fullText = pages.map(p => p.extract || "").join(" ");

    const rawSentences = fullText
      .replace(/==+.*?==+/g, " ")
      .replace(/\[.*?\]/g, "")
      .split(/[.!؟\n]+/)
      .map(s => s.trim())
      .filter(s => s.length > 28 && s.length < 450);

    const scoredSentences = rawSentences.map((sentence, idx) => {
      const sTokens = typeof tokenize === "function" ? tokenize(sentence) : sentence.toLowerCase().split(/\s+/);
      let matches = 0;
      qTokens.forEach(qt => { if (sTokens.includes(qt)) matches++; });

      const lexRatio = matches / (qTokens.length || 1);
      const prox = MathStats.proximityDecay(qTokens, sTokens);
      const logFit = evaluateLogicalFit(sentence, intent.type, sTokens);
      const posBonus = SpeedCore.fastExpDecay(idx);
      const combined = MathStats.weightedConfidence_40(lexRatio, prox) * 0.75 + posBonus * 0.25;
      const finalScore = LinearAlgebra.parametricSwish_10(combined * logFit);

      return { sentence, score: finalScore, origIdx: idx };
    });

    const scoresArr = scoredSentences.map(s => s.score);
    const meanVal = MathStats.mean(scoresArr);
    const stdVal = MathStats.stdDev(scoresArr, meanVal);

    scoredSentences.sort((a, b) => b.score - a.score);

    deepMemory = {
      lastTopic: rawQuery,
      allSentences: scoredSentences,
      usedIndices: new Set(),
      lang
    };

    const validAnswers = scoredSentences.filter(item => MathStats.zScore(item.score, meanVal, stdVal) > 0.15).slice(0, 3);
    const finalSelection = validAnswers.length > 0 ? validAnswers : scoredSentences.slice(0, 2);
    finalSelection.forEach(item => deepMemory.usedIndices.add(item.origIdx));

    const answerText = finalSelection.map(i => i.sentence).join(". ") + ".";
    const topScore = finalSelection[0]?.score || 0.5;
    const confidence = Math.min(99, Math.max(62, Math.round(FuzzyLogic.sigMember_12(topScore) * 100)));

    const result = {
      answer: answerText,
      confidence,
      analyzedCount: rawSentences.length,
      timeMs: (performance.now() - startTime).toFixed(1)
    };

    fastCache.set(qHash, result);
    return result;
  }

  return { FuzzyLogic, MathStats, InfoTheory, LinearAlgebra, SpeedCore, thinkAndAnswer };
})();

window.addEventListener("DOMContentLoaded", () => {
  if (typeof executeVotaEngine === "function") {
    const originalEngine = executeVotaEngine;
    window.executeVotaEngine = async function(query, lang) {
      if (typeof checkIdentityQuery === "function" && checkIdentityQuery(query)) {
        return originalEngine(query, lang);
      }
      return await VotaBrain.thinkAndAnswer(query, lang);
    };
  }
});
