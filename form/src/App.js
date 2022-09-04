import Form from "./components/StringForm.js";
import "./App.css";

function App() {
  return (
    <form>
      <Form formType="Nama" />
      <Form formType="Alamat" />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default App;
