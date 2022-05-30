import './App.css';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import men from './images/men.png';

const App = () => {

  const validationSchema = yup.object().shape({
    name: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    email: yup.string().email('Введите верный email').required('Обязательно'),
    tel: yup.string().matches(
      /^\+?[78] [(][0-9]{3}[)] [0-9]{3}[-][0-9]{2}[-][0-9]{2}$/,
      'Введите номер в формате +7 (999) 999-99-99').required('Обязательно'),
    subscribe: yup.bool().oneOf([true], 'Обязательно')
  })

  return (
    <div className='container'>
      <img src={men} alt='men' />
      <Formik
        initialValues={{
          name: '',
          email: '',
          tel: '',
          city: 'MSK',
          theme: 'theme1',
          communication: 'email',
          text: '',
          subscribe: false
        }}
        validateOnBlur
        onSubmit={(values) => { alert(JSON.stringify(values, null, 2)) }}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
          <div className='form'>
            <div>
              <p>Имя</p>
              <input
                tabIndex='1'
                placeholder='Введите ваше имя'
                type='text'
                name='name'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name} />
              {touched.name && errors.name && <p className='error'>{errors.name}</p>}
            </div>
            <div className='email'>
              <p>Email:</p>
              <input tabIndex='2'
                placeholder='Введите ваш Email'
                type='email'
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email} />
              {touched.email && errors.email && <p className='error'>{errors.email}</p>}
            </div>
            <div className='tel'>
              <p>Введите ваш номер телефона:</p>
              <input tabIndex='3'
                placeholder='+7 (999) 999-99-99'
                type='tel'
                name='tel'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tel} />
              {touched.tel && errors.tel && <p className='error'>{errors.tel}</p>}
            </div>
            <div className='city'>
              <p>Выберите город:</p>
              <Field as='select'
                tabIndex='4'
                name='city'>
                <option value='MSK'>Москва</option>
                <option value='SPB' >Санкт-Петербург</option>
                <option value='EKB'>Екатеринбург</option>
                <option value='NSK'>Новосибирск</option>
                <option value='IKT'>Иркутск</option>
              </Field>
            </div>
            <div className='theme'>
              <p>Выберите тему вашего вопроса:</p>
              <Field as='select'
                tabIndex='5'
                name='theme'>
                <option value='theme1'>Тема 1</option>
                <option value='theme2' >Тема 2</option>
                <option value='theme3'>Тема 3</option>
                <option value='theme4'>Тема 4</option>
              </Field>
            </div>
            <div className='communication'>
              <p>Предпочитаемый способ связи:</p>
              <Field as='select'
                tabIndex='6'
                name='communication'>
                <option value='email'>Email</option>
                <option value='sms' >SMS</option>
                <option value='call'>Звонок</option>
              </Field>
            </div>
            <div className='text'>
              <p>Дополнительная информация</p>
              <Field as='textarea'
                tabIndex='7'
                placeholder='Введите текст'
                name='text'
                cols='25'
                rows='5'>
              </Field>
            </div>
            <div className='subscribe'>
              <Field
                tabIndex='8'
                type='checkbox'
                name='subscribe'
                className='checkbox' />
              <p>Нажимая на кнопку "отправить", я даю согласие на обработку персональных данных</p>
              {touched.subscribe && errors.subscribe && <p className='error'>{errors.subscribe}</p>}
            </div>
            <div className='submit'>
              <button
                tabIndex='9'
                disabled={!isValid && !dirty}
                onClick={handleSubmit}
                type='submit'>Отправить</button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default App;
