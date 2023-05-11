import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActivities, postActivity } from '../../redux/actions';
import './Form.css';

const Form = ({ searchBarChange }) => {

  const dispatch = useDispatch();
  const countries = useSelector(state => state.allCountries);
  const allCountries = countries.sort((a, b) => a.name.localeCompare(b.name));
  
  const [ formInput, setFormInput ] = useState({
    name: '', // no nulo
    difficulty: 1, // entre 1 y 5 enteros
    duration: 0,
    seasson: 'Summer', // 'Summer', 'Autumn', 'Winter', 'Spring'
    arrayCountries: [],  // no nullo
    arrayNamesCountries: []
  });
  const [ formInputError, setFormInputError ] = useState({
    name: '',
    difficulty: '', 
    duration: '',
    seasson: '', 
    arrayCountries: ''
  });

  const formInputChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'arrayCountries') {
      if (!formInput.arrayCountries.includes(e.target.value)) {
        const arrayTarget = formInput.arrayCountries;
        arrayTarget.push(e.target.value);
        const arrayNamesTarget = formInput.arrayNamesCountries;
        const nameTarget = allCountries.find(el => el.id === e.target.value);
        arrayNamesTarget.push(nameTarget.name);
        setFormInput({
          ...formInput,
          arrayCountries: arrayTarget,
          arrayNamesCountries: arrayNamesTarget
        });   
      };
    } else {
      let targetValue = e.target.value;
      setFormInput({
        ...formInput,
        [e.target.name]: targetValue
      });
    };
    setFormInputError(validateFormInput({...formInput, [e.target.name]: e.target.value }));
  };

  const formInputChangeSeasson = (e) => {
    let targetValue = e.target.value;
    setFormInput({
      ...formInput,
      seasson: targetValue
    });  
    setFormInputError(validateFormInput({...formInput, seasson: e.target.value }));
  }

  const setEmpty = () => {
    setFormInput({
      name: '', 
      difficulty: 1, 
      duration: 0,
      seasson: '', 
      arrayCountries: [],
      arrayNamesCountries: [] 
    });
    setFormInputError({
      name: '',
      difficulty: '', 
      duration: '',
      seasson: '', 
      arrayCountries: ''
    });
  };

  const activitySubmit = async (e) => {
    e.preventDefault();
    if (!formInputError.name && !formInputError.difficulty && !formInputError.duration && !formInputError.seasson && !formInputError.arrayCountries) {
      const inputSend = {
        name: formInput.name,
        difficulty: formInput.difficulty,
        duration: parseInt(formInput.duration),
        seasson: formInput.seasson,
        arrayCountries: formInput.arrayCountries
      }
      const countryCreate = await postActivity(inputSend);
      if (countryCreate.hasOwnProperty('error')) window.alert(countryCreate.error);
      else {
        window.alert('Activity created successfully');
        setEmpty();
        const allActivities = await getAllActivities();
        if (allActivities.hasOwnProperty('error')) window.alert('Error accces activities');
        else dispatch(allActivities);
      }
    } else window.alert('Wrong data');
  }

  const activityDelete = (id) => {
    const arrayDelete = formInput.arrayCountries.filter((cou, ind) => ind !== id);
    const arrayNamesDelete = formInput.arrayNamesCountries.filter((cou, ind) => ind !== id);
    setFormInput({ 
      ...formInput, 
      arrayCountries: arrayDelete, 
      arrayNamesCountries: arrayNamesDelete });
  };

  useEffect(() => {
    searchBarChange(false);
    // eslint-disable-next-line
  },[searchBarChange]);
  
  return (
    <div className='form'  >
      <div className='form__principal' >
        <section className='form-section__title' >
          <h2>Creation of Activities</h2>
        </section>
        <form className='form__data' onSubmit={activitySubmit} >
          <section className='form-section__description' >
            <div className='form__description' >
              <div className='form__singleName' >
                <label ><h3>Name:</h3></label>
                <input
                  type='text'
                  name='name'
                  value={formInput.name}
                  onChange={formInputChange}
                />
              </div>
              { formInputError.name ? <p className='form__warning'>{formInputError.name}</p> : <br/> }
              <div className='form__single' >
                <label ><h3>Difficulty:</h3></label>
                <input 
                  type='text'
                  name='difficulty'
                  value={formInput.difficulty}
                  onChange={formInputChange}
                />
              </div>
              { formInputError.difficulty ? <p className='form__warning'>{formInputError.difficulty}</p> : <br/> }
              <div className='form__single' >
                <label ><h3>Duration:</h3></label>
                <input 
                  type='text'
                  name='duration'
                  value={formInput.duration}
                  onChange={formInputChange}
                />
              </div>
              { formInputError.duration ? <p className='form__warning'>{formInputError.duration}</p> : <br/> }
              <div className='form__seasson' >
                <label ><h3>Seasson:</h3></label>
                <fieldset className='form__radio' onChange={formInputChangeSeasson} >
                {['Summer', 'Autumn', 'Winter', 'Spring'].map((el, ind) => {
                  let formRadio = formInput.seasson === el
                    ? <input type='radio' name='seasson' value={el} defaultChecked />
                    : <input type='radio' name='seasson' value={el} />;
                  return (
                    <label className='form__check' key={ind} >
                      {formRadio}
                      <h4>{el}</h4>
                    </label>
                  );
                })}                  
                </fieldset>
              </div> 
              { formInputError.seasson ? <p className='form__warning'>{formInputError.seasson}</p> : <br/> }
            </div>

            {/* Separation */}
            <div className='form-separation'></div>

            <div className='form__country' >
              <article className='form-article__country' >
                <h3>Activity assignment</h3>
                { formInput.arrayCountries.length > 0 && formInput.arrayCountries.map((cou, ind) => {
                  return (
                    <div key={cou} className='form__names'>
                      <input type='text' className='form__delete' placeholder='X' onClick={() => activityDelete(ind)} />
                      <h4 >{cou} - {formInput.arrayNamesCountries[ind]}</h4>
                  </div>
                    )
                  })}
                { formInputError.arrayCountries ? <p className='form__warning'>{formInputError.arrayCountries}</p> : <br/> }
              </article>
              <select name='arrayCountries' size={10} onChange={formInputChange} >Paises
                { allCountries.length > 0 && allCountries.map(cou => {
                  return (
                      <option key={cou.id} value={cou.id} >{cou.name}</option>
                  )
                })}
              </select>
            </div>
          </section>
          <button type='submit' >Create Activity</button>
        </form> 
      </div> 
    </div>
  )
};

export default Form;

function validateFormInput (input) {
  const validInput = {};
  if (!input.name) 
    validInput.name = 'Activity name does not exist';
  if (!input.difficulty) 
    validInput.difficulty = 'Difficulty does not exist';
  if (isNaN(input.difficulty))
    validInput.difficulty = 'Difficulty must be a number';
  if (input.difficulty < 1 || input.difficulty > 5) 
    validInput.difficulty = 'The range of difficulty must be between 1 and 5';
  if (isNaN(input.duration))
    validInput.duration = 'Duration must be a number';
  if (input.duration  < 1) 
    validInput.duration = 'Duration must be greater than 1';
  if (!input.seasson) 
    validInput.seasson = 'Seasson does not exist';
  if (!['Summer', 'Autumn', 'Winter', 'Spring'].includes(input.seasson)) 
    validInput.seasson = 'The Seasson must be any of Summer, Autumn, Winter, Spring';
  if (input.arrayCountries.length < 1) 
    validInput.arrayCountries = 'Arrangement of Countries is empty';
  return validInput;
};
