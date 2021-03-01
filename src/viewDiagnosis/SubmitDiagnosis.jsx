import React , { useReducer,useState } from 'react';
import './Diagnosis.css';
const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
   }

function SubmitDiagnosis() {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
        }, 3000)
      }

    const handleChange = event => {
        setFormData({
          name: event.target.name,
          value: event.target.value,
        });
      }

  return (
    <div className="wrapper">
      <h1>Diagnosis</h1>
      {submitting &&
       <div>Submtting Form...</div>
     }
      <form onSubmit={handleSubmit}>
        <fieldset>
            <label>
                <p>Name</p>
                <input name="name"onChange={handleChange} />
            </label>

            <label>
                <p>Category : </p>
                <select name="category" onChange={handleChange}>
                    <option value="">--Please choose an option--</option>
                    <option value="moderate">moderate</option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                </select>
            </label>
            <label>
                <p>Comments :</p>
                <textarea name="comment" onChange={handleChange} />
            </label>
        </fieldset>
       <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SubmitDiagnosis;
//https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react#prerequisites