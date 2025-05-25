// const dfd = require("danfojs-node");
// const dfd1 = require("dan")
// const path = require("path");

// async function finalListMain(mainrank, category, state, gender, pwd) {
//   const columnsToConvert = [
//     'Closing_2022_1', 'Closing_2022_2', 'Closing_2022_3', 'Closing_2022_4',
//     'Closing_2022_5', 'Closing_2022_6', 'Closing_2023_1', 'Closing_2023_2',
//     'Closing_2023_3', 'Closing_2023_4', 'Closing_2023_5', 'Closing_2023_6',
//     'Closing_2024_1', 'Closing_2024_2', 'Closing_2024_3', 'Closing_2024_4', 'Closing_2024_5',
//     'Closing_2025_1', 'Closing_2025_2', 'Closing_2025_3', 'Closing_2025_4', 'Closing_2025_5'
//   ];

//   const dataPath = path.join(__dirname, "forecasted_2025_with_history_hybrid.csv");
//   const typePath = path.join(__dirname, "Categorized_Institutes.csv");

//   const dataMains = await dfd.readCSV(dataPath);
//   const typeDF = await dfd.readCSV(typePath);

//   dataMains.rename({ "Seat Type": "Category" }, { inplace: true });

//   const rank = parseInt(mainrank);
//   const catg = pwd === "Yes" ? `${category} (PwD)` : category;

//   const genderFilter = ["Gender-Neutral"];
//   if (gender === "Female") {
//     genderFilter.push("Female-only (including Supernumerary)");
//   }

//   // Filter by category and gender
//   const pMains = dataMains.query(
//     row => row["Category"] === catg && genderFilter.includes(row["Gender"])
//   );

//   const homeQuota = (["Goa", "Jammu and Kashmir"].includes(state))
//     ? ["Home State", state]
//     : ["Home State"];

//   const homeStateMains = pMains.query(
//     row => row["State"] === state && homeQuota.includes(row["Quota"])
//   );

//   const otherStateMains = pMains.query(
//     row => ["Other State", "All India"].includes(row["Quota"])
//   );

//   // Merge to get sort rank from other state
//   const merged = dfd.merge({
//     left: homeStateMains,
//     right: otherStateMains.loc({ columns: ["Institute", "Branch", "Closing_2025_5"] }),
//     on: ["Institute", "Branch"],
//     how: "left",
//     suffixes: ["", "_OtherState"]
//   });

//   merged.addColumn("Sort Rank", merged["Closing_2025_5_OtherState"].map(v => v ?? rank), { inplace: true });
//   otherStateMains.addColumn("Sort Rank", otherStateMains["Closing_2025_5"], { inplace: true });

//   const finalData = dfd.concat({ dfList: [merged, otherStateMains], axis: 0 });
//   const deduped = finalData.dropDuplicates(["Institute", "Branch"]);
//   const sorted = deduped.sortValues("Sort Rank");

//   if (sorted.shape[0] === 0) return new dfd.DataFrame([]);

//   // Add probability
//   sorted.addColumn("Probability", sorted["Closing_2025_5"].map(val => {
//     if (val == null) return "unknown";
//     if (rank <= val) return "high";
//     else if (rank <= val * 1.1) return "medium";
//     else return "low";
//   }), { inplace: true });

//   // Add proximity
//   sorted.addColumn("Proximity", sorted["Closing_2025_5"].map(val => Math.abs(rank - val)), { inplace: true });

//   const highProb = sorted.query(row => row["Probability"] === "high");

//   const filtered = sorted.query(row =>
//     ["medium", "low"].includes(row["Probability"]) &&
//     row["Closing_2025_5"] >= rank * 0.8
//   ).sortValues("Proximity");

//   const lowCandidates = filtered.query(row => row["Probability"] === "low");
//   const mediumCandidates = filtered.query(row => row["Probability"] === "medium");

//   const lowProb = lowCandidates.head(Math.max(2, Math.floor(0.1 * lowCandidates.shape[0])));
//   const mediumProb = mediumCandidates.head(Math.max(3, Math.floor(0.1 * mediumCandidates.shape[0])));

//   const finalColleges = dfd.concat({ dfList: [highProb, lowProb, mediumProb], axis: 0 })
//     .sortValues("Sort Rank");

//   // Predict round
//   const predictRound = (row) => {
//     for (const year of [2025, 2024, 2023, 2022]) {
//       const maxRound = (year === 2022 || year === 2023) ? 6 : 5;
//       for (let r = 1; r <= maxRound; r++) {
//         const col = `Closing_${year}_${r}`;
//         const val = row[col];
//         if (val && rank <= val) return `Round ${r} (${year})`;
//       }
//     }
//     return "Not Available";
//   };

//   finalColleges.addColumn("Likely Round", finalColleges.apply(predictRound, { axis: 1 }), { inplace: true });

//   const clean = finalColleges.drop({ columns: ["Closing_2025_5_OtherState", "Sort Rank", "Proximity"], inplace: false });

//   // Merge with typeDF
//   const finalResult = dfd.merge({ left: clean, right: typeDF, leftOn: "Institute", rightOn: "Institute Name", how: "left" })
//     .drop({ columns: ["Institute Name"], inplace: false });

//   return finalResult;
// }

// // Export
// module.exports = finalListMain;
