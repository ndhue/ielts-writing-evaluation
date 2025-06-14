"use client";

import { CriterionScoreCircle } from "@/components";
import { AIEvaluation } from "@/hooks/useEssayEvaluation";
import { RadarChart } from "@/ui/evaluation";
import { MainTitle, ScoreBox, WritingForm } from "@/ui/home";
import formatEvaluation from "@/utils/evaluationFormatter";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface Evaluation {
  topic: string;
  essay: string;
  evaluation: AIEvaluation;
}

export default function Home() {
  const [currentEvaluation, setCurrentEvaluation] = useState<Evaluation | null>(
    null
  );
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Format evaluation data
  const formattedEvaluation = useMemo(() => {
    if (!currentEvaluation?.evaluation) return null;
    return formatEvaluation(currentEvaluation.evaluation);
  }, [currentEvaluation]);

  const hasEvaluationResults = !!formattedEvaluation;

  // PDF download function
  const handleDownloadPDF = () => {
    if (!currentEvaluation || !formattedEvaluation) return;

    setIsGeneratingPdf(true);

    try {
      const doc = new jsPDF();

      const marginX = 20;
      const contentWidth = 170;
      let y = 20;

      const writeText = (
        label: string,
        text: string,
        spacing = 10,
        fontSize = 12
      ) => {
        doc.setFontSize(fontSize);
        doc.setFont("helvetica", "normal");
        const lines = doc.splitTextToSize(text, contentWidth);
        doc.text(label, marginX, y);
        y += spacing;
        lines.forEach((line) => {
          if (y > 280) {
            doc.addPage();
            y = 20;
          }
          doc.text(line, marginX, y);
          y += 6;
        });
      };

      // Title
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("IELTS Writing Evaluation", marginX, y);
      y += 12;

      // Topic
      writeText("Topic:", currentEvaluation.topic, 8);

      // Essay
      writeText("Essay:", currentEvaluation.essay, 8);

      // New Page: Feedback First
      doc.addPage();
      y = 20;
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Feedback Summary", marginX, y);
      y += 10;

      const bulletList = (title: string, items: string[]) => {
        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.text(title, marginX, y);
        y += 7;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        items.forEach((item) => {
          const lines = doc.splitTextToSize(`• ${item}`, contentWidth);
          lines.forEach((line) => {
            if (y > 280) {
              doc.addPage();
              y = 20;
            }
            doc.text(line, marginX, y);
            y += 6;
          });
        });
        y += 6;
      };

      bulletList("Strengths:", formattedEvaluation.strengths);
      bulletList(
        "Areas for Improvement:",
        formattedEvaluation.areasForImprovement
      );
      bulletList(
        "Strategies for Enhancement:",
        formattedEvaluation.strategiesForEnhancement
      );

      // New Page: Assessment Table
      doc.addPage();
      y = 20;
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Detailed Assessment", marginX, y);
      y += 10;

      const tableData = [
        ["Criterion", "Score", "Feedback"],
        [
          "Task Achievement",
          formattedEvaluation.taskResponseScore.toString(),
          formattedEvaluation.taskResponseExplanation,
        ],
        [
          "Coherence & Cohesion",
          formattedEvaluation.coherenceAndCohesionScore.toString(),
          formattedEvaluation.coherenceAndCohesionExplanation,
        ],
        [
          "Lexical Resource",
          formattedEvaluation.lexicalResourceScore.toString(),
          formattedEvaluation.lexicalResourceExplanation,
        ],
        [
          "Grammar",
          formattedEvaluation.grammaticalRangeAndAccuracyScore.toString(),
          formattedEvaluation.grammaticalRangeAndAccuracyExplanation,
        ],
      ];

      autoTable(doc, {
        startY: y,
        head: [tableData[0]],
        body: tableData.slice(1),
        theme: "grid",
        headStyles: {
          fillColor: [30, 144, 255],
          textColor: 255,
          fontSize: 11,
        },
        styles: {
          font: "helvetica",
          fontSize: 10,
          cellPadding: 3,
          valign: "top",
        },
        columnStyles: {
          0: { cellWidth: 45 },
          1: { cellWidth: 20, halign: "center" },
          2: { cellWidth: 105 },
        },
        margin: { left: marginX },
      });

      const finalY = doc.lastAutoTable.finalY + 15;
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text(
        `Overall Score: ${formattedEvaluation.overallScore}`,
        marginX,
        finalY
      );

      // Save file
      const date = new Date().toISOString().split("T")[0];
      const filename = `IELTS-Evaluation-${date}.pdf`;
      doc.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        draggable
        pauseOnHover
      />
      <MainTitle />
      <div className="grid grid-cols-5 gap-4 my-4">
        <div className="col-span-3">
          <WritingForm handleShowEvaluation={setCurrentEvaluation} />
        </div>
        <div className="col-span-2 flex flex-col gap-6">
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="font-semibold text-gray-800">
              Est. Overall Band Score
            </div>
            <div className="text-6xl font-bold text-purple-600">
              {formattedEvaluation?.overallScore || 0}
            </div>
            <div className="text-xs text-gray-600 mt-1">(+/- 0.5)</div>
          </div>
          <ScoreBox
            label="Task Response"
            score={formattedEvaluation?.taskResponseScore || 0}
          />
          <ScoreBox
            label="Coherence and Cohesion"
            score={formattedEvaluation?.coherenceAndCohesionScore || 0}
          />
          <ScoreBox
            label="Lexical Resource"
            score={formattedEvaluation?.lexicalResourceScore || 0}
          />
          <ScoreBox
            label="Grammar"
            score={formattedEvaluation?.grammaticalRangeAndAccuracyScore || 0}
          />
        </div>
      </div>

      {/* Show evaluation results when available */}
      {hasEvaluationResults && (
        <div className="mt-10 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">
            Evaluation Results
          </h2>

          {/* Radar Chart */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Score Breakdown
            </h3>
            <div className="h-[350px] max-w-[700px] flex items-center justify-center mx-auto">
              <RadarChart
                scores={{
                  taskAchievement: formattedEvaluation.taskResponseScore,
                  coherenceCohesion:
                    formattedEvaluation.coherenceAndCohesionScore,
                  lexicalResource: formattedEvaluation.lexicalResourceScore,
                  grammar: formattedEvaluation.grammaticalRangeAndAccuracyScore,
                }}
              />
            </div>
          </div>

          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPdf}
            className="flex items-center bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            {isGeneratingPdf ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </span>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download PDF
              </>
            )}
          </button>

          {/* Criterion Scores */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Criterion Scores
            </h3>

            {[
              {
                name: "Task Achievement",
                score: formattedEvaluation.taskResponseScore,
                feedback: formattedEvaluation.taskResponseExplanation,
              },
              {
                name: "Coherence & Cohesion",
                score: formattedEvaluation.coherenceAndCohesionScore,
                feedback: formattedEvaluation.coherenceAndCohesionExplanation,
              },
              {
                name: "Lexical Resource",
                score: formattedEvaluation.lexicalResourceScore,
                feedback: formattedEvaluation.lexicalResourceExplanation,
              },
              {
                name: "Grammar",
                score: formattedEvaluation.grammaticalRangeAndAccuracyScore,
                feedback:
                  formattedEvaluation.grammaticalRangeAndAccuracyExplanation,
              },
            ].map((criterion, index) => (
              <div
                key={index}
                className={`border-t border-gray-200 ${
                  index === 0 ? "border-t-0" : ""
                } py-6`}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex items-center justify-center w-full md:w-24">
                    <CriterionScoreCircle score={criterion.score} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {criterion.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {criterion.feedback}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feedback Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Detailed Feedback
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Strengths */}
              <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm">
                <h4 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Strengths
                </h4>
                <ul className="list-none mt-3 text-green-700 space-y-3">
                  {formattedEvaluation.strengths.length > 0 ? (
                    formattedEvaluation.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block bg-green-200 rounded-full h-1.5 w-1.5 mt-2 mr-2"></span>
                        <span>{strength}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start">
                      <span className="inline-block bg-green-200 rounded-full h-1.5 w-1.5 mt-2 mr-2"></span>
                      <span>No specific strengths mentioned</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="bg-red-50 p-6 rounded-xl border border-red-100 shadow-sm">
                <h4 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Areas for Improvement
                </h4>
                <ul className="list-none mt-3 text-red-700 space-y-3">
                  {formattedEvaluation.areasForImprovement.length > 0 ? (
                    formattedEvaluation.areasForImprovement.map(
                      (area, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block bg-red-200 rounded-full h-1.5 w-1.5 mt-2 mr-2"></span>
                          <span>{area}</span>
                        </li>
                      )
                    )
                  ) : (
                    <li className="flex items-start">
                      <span className="inline-block bg-red-200 rounded-full h-1.5 w-1.5 mt-2 mr-2"></span>
                      <span>No specific areas for improvement mentioned</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Strategies for Enhancement */}
            {formattedEvaluation.strategiesForEnhancement.length > 0 && (
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
                <h4 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Strategies for Enhancement
                </h4>
                <ul className="list-none mt-3 text-blue-700 space-y-3">
                  {formattedEvaluation.strategiesForEnhancement.map(
                    (strategy, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block bg-blue-200 rounded-full h-1.5 w-1.5 mt-2 mr-2"></span>
                        <span>{strategy}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
