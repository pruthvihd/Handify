import Navbar from "../components/Navbar";

export default function Requests() {
  return (
    <>
      <Navbar />
      <div className="section">
        <h2>Custom Requests</h2>

        <textarea placeholder="Describe your requirement" />
        <br /><br />
        <button>Submit Request</button>
      </div>
    </>
  );
}