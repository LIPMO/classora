import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function Classora() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState({});
  const [showPDF, setShowPDF] = useState(false);
  const pdfRef = useRef();

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("classora-notes")) || {};
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("classora-notes", JSON.stringify(notes));
  }, [notes]);

  const handleSave = () => {
    const updatedNotes = {
      ...notes,
      [selectedCourse]: {
        title: courseTitle,
        content: noteContent,
        date: new Date().toLocaleDateString(),
      },
    };
    setNotes(updatedNotes);
    alert("Note enregistrée ✅");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-800">📚 Classora</h1>
        <div className="space-x-2">
          <Button onClick={() => window.open("https://www.ecoledirecte.com/", "_blank")}>Ecole Directe</Button>
          <Button onClick={() => window.open("https://www.tabuleo.com/", "_blank")}>Tabuleo</Button>
          <Button onClick={() => window.open("https://incognitotalk.xyz", "_blank")}>IncognitoTalk</Button>
          <Button onClick={() => setShowPDF(!showPDF)}>{showPDF ? "Cacher l'emploi du temps" : "Afficher l'emploi du temps"}</Button>
        </div>
      </div>

      {showPDF && (
        <div className="mb-4">
          <iframe
            ref={pdfRef}
            src="/emploit.pdf"
            className="w-full h-[600px] border border-gray-300"
            title="Emploi du temps"
          ></iframe>
        </div>
      )}

      <Card className="mb-4 border border-gray-200 shadow-sm">
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Nom du cours (ex: Mathématiques)"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          />
          <Input
            placeholder="Titre du chapitre (ex: Les fractions)"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          />
          <Button onClick={handleSave}>💾 Enregistrer</Button>
        </CardContent>
      </Card>

      <Textarea
        placeholder="Écris ton cours ici..."
        rows={10}
        className="w-full mb-4 border border-gray-300"
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />

      <h2 className="text-xl font-semibold mb-2">🗂️ Mes cours enregistrés</h2>
      <div className="grid gap-4">
        {Object.entries(notes).map(([key, value]) => (
          <Card key={key} className="bg-gray-50 border border-gray-200">
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{value.title} ({key})</h3>
              <p className="text-sm text-gray-500">{value.date}</p>
              <p className="mt-2 whitespace-pre-wrap text-gray-700">{value.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
