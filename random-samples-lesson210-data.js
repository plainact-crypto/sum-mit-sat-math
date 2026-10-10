module.exports={
  "title": "Random Samples",
  "index": 210,
  "slug": "random-samples",
  "classification": "NEITHER",
  "sections": [
    [
      "LESSON OBJECTIVE",
      "Choose representative random samples and make cautious estimates",
      "Identify the population and sample, recognize selection and response bias, and use sample proportions to estimate counts without claiming certainty."
    ],
    [
      "WHAT YOU NEED TO KNOW",
      "A sample is a smaller group used to learn about a population",
      "A population is the entire group of interest. A sample contains selected members. Sampling is useful when surveying everyone is too costly, but the selection method determines whether the results are trustworthy."
    ],
    [
      "KEY DEFINITIONS",
      "Population, sample, parameter, statistic",
      "A parameter describes the population; a statistic describes a sample. Random selection uses chance rather than the surveyor's preference. Bias systematically favors some outcomes."
    ],
    [
      "CORE RULE",
      "Random selection must come from the target population",
      "In a simple random sample of size n from N members, every set of n members has the same selection probability. An individual member's inclusion probability is n/N."
    ],
    [
      "HOW IT WORKS",
      "Five steps for SAT sampling questions",
      "1. Identify the population. 2. Identify who could be selected. 3. Check for randomness and nonresponse. 4. Compute sample proportion p = successes/sample size. 5. Estimate population count as N × p, and report it as an estimate."
    ],
    [
      "WORKED EXAMPLE 1 — DESIGN",
      "Use a complete roster and random numbers",
      "A school has 800 students. Number all 800 names and randomly select 80 distinct numbers. This is a simple random sample if every 80-person subset is equally likely. Each student's inclusion chance is 80/800 = 1/10."
    ],
    [
      "WORKED EXAMPLE 2 — ESTIMATE",
      "Scale a sample proportion carefully",
      "Of 70 randomly selected residents, 28 support a plan. The sample proportion is 28/70 = 0.40. In a population of 350, estimate 350 × 0.40 = 140 supporters. This is not a guaranteed count."
    ],
    [
      "WORKED EXAMPLE 3 — BIAS",
      "Convenience and voluntary response are not random",
      "Asking the first 40 students entering a library is a convenience sample. Posting an optional online poll is voluntary response. Both can overrepresent particular views even if many people respond."
    ],
    [
      "WORKED EXAMPLE 4 — STRATIFICATION",
      "Keep subgroup proportions in a stratified sample",
      "A school has 300 seniors and 200 juniors. For a proportional random sample of 50, select 30 seniors and 20 juniors randomly within their groups. This preserves the 3:2 population ratio."
    ],
    [
      "WORKED EXAMPLE 5 — WEIGHTED ESTIMATE",
      "Weight unequal groups by their population sizes",
      "Grade 9 has 400 students, with 60% estimated support; Grade 10 has 600, with 40% support. The overall estimate is (400 × 0.60 + 600 × 0.40)/1000 = 0.48, or 48%. Do not average 60% and 40% without population weights."
    ],
    [
      "OTHER METHODS",
      "Systematic and cluster selection need care",
      "A systematic sample chooses every kth name after a random start, but ordering patterns can cause bias. A cluster sample randomly selects whole groups. Neither is automatically equivalent to a simple random sample."
    ],
    [
      "NONRESPONSE",
      "Random invitations do not guarantee unbiased responses",
      "If 200 people are randomly invited but only 40 respond, results describe the 40 respondents. Nonresponse can bias an estimate if responders differ from nonresponders."
    ],
    [
      "COMMON MISTAKES",
      "Watch the selection method and denominator",
      "Do not call a voluntary poll random. Do not confuse sample size with population size. Do not use an unweighted mean of subgroup percentages when group sizes differ. Do not treat an estimate as an exact count."
    ],
    [
      "EXAM STRATEGY",
      "Identify the target population before calculating",
      "On the SAT, ask who the conclusion concerns, how respondents were chosen, and whether all groups had a fair chance. For a numerical estimate, calculate the sample fraction first and multiply by population size."
    ],
    [
      "QUICK CHECK",
      "Try three mental checks",
      "If 24 of 80 randomly sampled people agree, what percent agree? If the population has 500 members, what is the estimated number agreeing? Would asking only the surveyor's friends be representative? Answers: 30%, 150, and no."
    ],
    [
      "LESSON RECAP / NEXT STEP",
      "Randomness supports inference; it does not guarantee perfection",
      "A defensible survey uses a suitable sampling frame, chance-based selection, and attention to response bias. Review 18 practice problems, their 18 aligned solutions, then submit the five-question test."
    ]
  ],
  "practice": [
    [
      0,
      "A school numbers all 600 students and uses a random-number generator to choose 60 distinct numbers. What method is used?",
      "Simple random sampling",
      [
        "Convenience sampling",
        "Voluntary response",
        "A census"
      ],
      "Every set of 60 students can be selected by the random-number procedure; selection is not based on access or self-selection."
    ],
    [
      0,
      "A town has 1,200 residents. A survey randomly selects 50 residents. What is the population size?",
      "1,200",
      [
        "50",
        "1,150",
        "1,250"
      ],
      "The population is all 1,200 residents; the 50 respondents form the sample."
    ],
    [
      0,
      "Of 60 randomly selected students, 18 prefer a later start. What percentage of the sample prefers it?",
      "30%",
      [
        "18%",
        "40%",
        "60%"
      ],
      "18/60 = 3/10 = 0.30, so 30% of the sample favors the change."
    ],
    [
      1,
      "In a random sample of 70 residents, 28 support a project. Estimate how many of 350 residents support it.",
      "140",
      [
        "98",
        "175",
        "280"
      ],
      "28/70 = 0.40; multiply 0.40 by the population size 350 to estimate 140."
    ],
    [
      1,
      "A website posts an optional poll and reports that 92% of visitors who answered favor a policy. What is the main sampling concern?",
      "Voluntary-response bias",
      [
        "Simple random sampling",
        "No possible bias",
        "Proportional stratification"
      ],
      "People choose whether to answer; those with strong opinions may be overrepresented."
    ],
    [
      1,
      "A school randomly selects 10 students from each grade after separating its roster by grade. Which design is this?",
      "Stratified random sampling",
      [
        "Convenience sampling",
        "Voluntary response",
        "A full census"
      ],
      "Students are divided into grade strata and randomly sampled within each stratum."
    ],
    [
      1,
      "From 800 students, a simple random sample of 80 is drawn. What is one student's probability of inclusion?",
      "1/10",
      [
        "1/80",
        "1/800",
        "9/10"
      ],
      "Each student's inclusion probability is sample size divided by population size: 80/800 = 1/10."
    ],
    [
      1,
      "A random sample of 160 voters contains 64 supporters. What is the sample support rate?",
      "40%",
      [
        "25%",
        "60%",
        "64%"
      ],
      "64/160 = 2/5 = 40%."
    ],
    [
      1,
      "A random sample contains 120 people and 30% support a proposal. How many sampled people support it?",
      "36",
      [
        "30",
        "40",
        "84"
      ],
      "0.30 × 120 = 36 sampled supporters."
    ],
    [
      1,
      "A student surveys the first 40 people entering the library. What sampling method is this?",
      "Convenience sampling",
      [
        "Simple random sampling",
        "Stratified random sampling",
        "A census"
      ],
      "The sample is chosen by easy access at one location, not random selection from the entire target population."
    ],
    [
      1,
      "A numbered list has 600 members. After a random start, every 12th member is selected. How many members are sampled?",
      "50",
      [
        "12",
        "48",
        "72"
      ],
      "600/12 = 50 selected members. The random start matters, and periodic patterns may still affect representativeness."
    ],
    [
      2,
      "A school has 300 seniors and 200 juniors. For a proportional stratified sample of 50, how many seniors should be selected?",
      "30",
      [
        "20",
        "25",
        "35"
      ],
      "Seniors are 300/500 = 3/5 of the population, so choose (3/5) × 50 = 30 seniors."
    ],
    [
      2,
      "In a random sample of 90 customers, 54 are satisfied. Estimate the number satisfied among 1,500 customers.",
      "900",
      [
        "540",
        "810",
        "1,080"
      ],
      "54/90 = 0.60; 0.60 × 1,500 = 900 estimated satisfied customers."
    ],
    [
      2,
      "A survey of all students' study habits asks only students in honors classes. What is the strongest concern?",
      "Undercoverage of other students",
      [
        "An accurate census",
        "Perfect random selection",
        "A larger sample always fixes it"
      ],
      "Students outside honors classes had no chance of inclusion, so the sample cannot fairly represent all students."
    ],
    [
      2,
      "A random invitation goes to 200 students; only 40 reply, and 32 of those support a change. Which conclusion is justified?",
      "80% of respondents support it; nonresponse may bias the estimate",
      [
        "80% of all students certainly support it",
        "32% of invited students support it",
        "The sample is a census"
      ],
      "32/40 = 80% among respondents, but 160 invited students did not respond, so population inference is uncertain."
    ],
    [
      2,
      "One random sample has 30 supporters out of 50; another has 75 supporters out of 150. What is the combined support rate?",
      "52.5%",
      [
        "55%",
        "60%",
        "50%"
      ],
      "Pool counts rather than averaging percentages: (30+75)/(50+150) = 105/200 = 52.5%."
    ],
    [
      3,
      "A district has 600 Grade 9 and 300 Grade 10 students. In a proportional stratified sample of 120, how many Grade 9 students are needed?",
      "80",
      [
        "40",
        "60",
        "90"
      ],
      "Grade 9 represents 600/900 = 2/3 of the district; (2/3) × 120 = 80."
    ],
    [
      3,
      "Grade A has 400 students and an estimated 60% support rate. Grade B has 600 and an estimated 40% rate. What is the population-weighted overall support estimate?",
      "48%",
      [
        "50%",
        "52%",
        "44%"
      ],
      "Estimated supporters: 400×0.60 + 600×0.40 = 240+240=480; 480/1000 = 48%."
    ]
  ],
  "test": [
    [
      "A principal selects 40 students using random numbers from a complete roster. What is the best description?",
      "Simple random sample",
      [
        "Convenience sample",
        "Voluntary response",
        "Census"
      ],
      "Every student is eligible through a chance-based selection procedure."
    ],
    [
      "Of 75 randomly sampled shoppers, 24 choose option A. What percent choose A?",
      "32%",
      [
        "24%",
        "36%",
        "42%"
      ],
      "24/75 = 8/25 = 0.32 = 32%."
    ],
    [
      "A school has 500 students in Group A and 300 in Group B. A proportional random sample of 80 should contain how many from Group A?",
      "50",
      [
        "30",
        "40",
        "60"
      ],
      "500/800 × 80 = 50 Group A students."
    ],
    [
      "One random sample has 35 supporters out of 50 and another has 72 out of 120. What fraction of all 170 sampled people are supporters?",
      "107/170",
      [
        "13/20",
        "7/10",
        "72/170"
      ],
      "Add supporter counts and sample sizes: (35+72)/(50+120)=107/170, approximately 62.94%."
    ],
    [
      "Group A has 250 people with estimated 60% support, and Group B has 750 with estimated 50% support. What is the population-weighted estimate?",
      "52.5%",
      [
        "55%",
        "50%",
        "56.25%"
      ],
      "(250×0.60+750×0.50)/1000 = (150+375)/1000 = 52.5%."
    ]
  ]
};
