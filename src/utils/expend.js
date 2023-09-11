const dictionary = {
  HPC: "High Performance Computing",
  CN: "Computer Networking",
  BIS: "Business Information System ",
  SE: "Software Engineering",
  KE: "Knowledge Engineering",
  ES: "Embemded System",
  CS: "Computer Science",
  CT: "Computer Technology",
  1: "First Year",
  2: "Second Year",
  3: "Third Year",
  4: "Fourth Year",
  5: "Final Year",
};

export const convert = (input) => {
  if (dictionary[input]) return dictionary[input];
  else return input;
};
