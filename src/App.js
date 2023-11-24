import { useState, useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";


function App() {
  const data = [];
  // [
  //   {
  //     section: {
  //       name: "section name",
  //       label: {
  //         name: "label name",
  //         question: {
  //           name: "question",
  //         },
  //         or: true,
  //       },
  //     },
  //   },
  // ];

  const [arr, setArr] = useState(data || []);
  const [selected, setSelected] = useState(0);
  const [labelSelected, setLabelSelected] = useState(0);

  const addSection = () => {
    setArr((prevArr) => [
      ...prevArr,
      { section: { name: "section name", label: [] } },
    ]);
  };

  const addLabel = () => {
    const temp = arr;
    temp[selected].section.label.push({ name: "label name", question: [] });

    temp[selected].section = { ...temp[selected].section };
    setArr([...temp]);
  };

  const addQuestion = () => {
    const temp = arr;
    temp[selected].section.label[labelSelected]?.question.push({
      name: "question",
      or: false,
    });
    temp[selected].section = { ...temp[selected].section };
    setArr([...temp]);
  };

  const addOr = () => {
    const temp = arr;
    temp[selected].section.label[labelSelected].or = true;
    setArr([...temp]);
  };

  const handleDeleteSection = (index) => {
    setArr(arr.filter((obj,i) => index !== i))
  }

  const handleDeleteLabel = (sectionIndex,labelIndex) => {
    const newData = [...arr];
    const section = newData[sectionIndex];
    
    if (section && section.section && section.section.label) {
        section.section.label.splice(labelIndex, 1);
    }

    setArr(newData);
  }

  const handleDeleteQuestion = (sectionIndex,labelIndex, questionIndex) => {
    const newData = [...arr];
    const section = newData[sectionIndex];

    if (section && section.section && section.section.label && section.section.label[labelIndex] && section.section.label[labelIndex].question) {
        section.section.label[labelIndex].question.splice(questionIndex, 1);
    }

    setArr(newData);
  }

  useEffect(() => {
    console.log("arr:", arr);
  }, [arr]);

  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid item xs={8}>
          {arr.map((sectionObj, index) => {
            return (
              <>
                <div>
                  <FormControlLabel
                    value={index}
                    label={`${index + 1}. ${sectionObj.section?.name}`}
                    onChange={(e) => setSelected(e.target.value)}
                    control={<Radio />}
                  />
                  <Button variant="text" color="error" onClick={()=>handleDeleteSection(index)}>
                    delete
                  </Button>
                </div>

                {sectionObj.section?.label?.length > 0 &&
                  sectionObj.section.label.map((ele, eleIndex) => (
                    <>
                      <div>
                        <FormControlLabel
                          value={eleIndex}
                          label={`${eleIndex + 1}. ${ele?.name}`}
                          onChange={(e) => setLabelSelected(e.target.value)}
                          control={<Radio />}
                        />
                        <Button variant="text" color="error" onClick={()=>handleDeleteLabel(index, eleIndex)}>
                    delete
                  </Button>
                      </div>

                      {ele?.question?.length > 0 &&
                        ele.question.map((eleq, eleqIndex) => (
                          <><div>{`${eleqIndex + 1}. ${eleq?.name}`}
                            <Button variant="text" color="error" onClick={() => handleDeleteQuestion(index, eleIndex, eleqIndex)}>
                              delete
                            </Button>
                          </div></>
                          
                        ))}
                        <div>
                              {sectionObj.section.label?.[labelSelected]?.or ? "or" : ""}
                            </div>
                    </>
                  ))}
                
              </>
            );
          })}
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="primary" onClick={addSection}>
            Section
          </Button>

          <Button variant="contained" color="warning" onClick={addLabel}>
            Label
          </Button>

          <Button variant="contained" color="success" onClick={addQuestion}>
            Question
          </Button>

          <Button variant="contained" color="inherit" onClick={addOr}>
            OR
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
