const chapters = (fileReader) => [
  {
    id: 1,
    title: "Setting up your environment",
    duration: 10,
    file_name: '1-setting-up-your-environment',
    description: fileReader(__dirname + `/1-setting-up-your-environment/introduction.md`),
    chapter_order: 1,
    tutorial_id: 1
  },
  {
    id: 2,
    title: "Get familiar with the schema",
    duration: 7,
    file_name: fileReader(__dirname + '/2-get-familiar-with-the-schema/introduction.md'),
    chapter_order: 2,
    tutorial_id: 1
  }
];
module.exports = chapters;
