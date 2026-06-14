import Navbar from "../components/Navbar";

export default function Artists() {
  return (
    <>
      <Navbar />
      <div className="section">
        <h2>Our Artists</h2>
        <p>Meet talented creators</p>

        <button>View Profile</button>
        <button>Follow</button>
      </div>
    </>
  );
}