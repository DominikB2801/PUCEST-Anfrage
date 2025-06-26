import { useState } from 'react';
import './index.css';
import logo from '../public/pucest_logo.jpg';

export default function App() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', firma: '', email: '', telefon: '',
    material: '', temperatur: '', feuchtigkeit: '',
    beschreibung: '', datei: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));
    await fetch('https://formspree.io/f/mnqepzep', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    });
    alert('Danke – Ihre Anfrage wurde gesendet!');
    setStep(1);
  };

  const renderProgress = () => {
    const percent = step === 1 ? 33 : step === 2 ? 66 : 100;
    return (
      <div className="progress">
        <div className="progress-bar" style={{ width: percent + '%' }}></div>
      </div>
    );
  };

  return (
    <div className="app">
      <header className="header">
        <img src="pucest_logo.jpg" alt="PUCEST Logo" className="logo" />
      </header>

      {renderProgress()}

      {step === 1 && (
        <main className="center">
          <h2>Schildern Sie uns Ihr Problem</h2>
          <p>
            Machen Sie ein Foto der betroffenen Stelle, beantworten Sie ein paar Fragen – wir melden uns mit einer Lösung.
          </p>
          <button onClick={() => setStep(2)}>Jetzt starten</button>
        </main>
      )}

      {step === 2 && (
        <main>
          <h3>Foto aufnehmen oder auswählen</h3>
          <input type="file" name="datei" accept="image/*" capture="environment" onChange={handleChange} />
          <button onClick={() => setStep(3)}>Weiter zur Beschreibung</button>
        </main>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <h3>Beschreiben Sie Ihr Problem</h3>
          <input name="name" placeholder="Name" onChange={handleChange} required />
          <input name="firma" placeholder="Firma" onChange={handleChange} />
          <input name="email" type="email" placeholder="E-Mail" onChange={handleChange} required />
          <input name="telefon" placeholder="Telefon" onChange={handleChange} />
          <input name="material" placeholder="Gefördertes Material" onChange={handleChange} />
          <input name="temperatur" placeholder="Temperaturbereich" onChange={handleChange} />
          <input name="feuchtigkeit" placeholder="Feuchtigkeitsbedingungen" onChange={handleChange} />
          <textarea name="beschreibung" placeholder="Problembeschreibung" onChange={handleChange}></textarea>
          <button type="submit">Anfrage absenden</button>
        </form>
      )}
    </div>
  );
}