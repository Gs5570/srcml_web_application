import { FaJava, FaCode } from 'react-icons/fa';
import { SiCsharp } from 'react-icons/si';
import { BiLogoCPlusPlus } from 'react-icons/bi';
import { TbHexagonLetterC } from 'react-icons/tb';

import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import axios from 'axios';

import '../styles/body.css';
const URL = 'http://localhost:3000/convertsrc';

import SrcMLCode from './srcMLCode';

export default function Body() {
  const [apiRes, setApiRes] = useState();
  const [srcCode, setSrcCode] = useState();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // console.log('errors from submission', errors);
  // console.log(watch());

  const onSubmit = async (data) => {
    console.log(data);
    const { selectedLang, srcCode, uploadedFile } = data;
    const formData = new FormData();

    //grab the updloaded file
    formData.append('selectedLang', selectedLang);
    formData.append('srcCode', srcCode);
    formData.append('fileUploaded', uploadedFile);
    formData.append('uploadedFile', data.uploadedFile[0]);
    // data = { ...data, uploadedFile: data.uploadedFile[0].name };
    // formData.append('uploadedData', JSON.stringify(data));

    // Display the values formData.
    for (const value of formData.values()) {
      // console.log(value);
    }

    await axios
      .post(URL, formData)
      .then((res) => {
        // console.log(res.data);
        setSrcCode(res.data);
      })
      .catch((error) => console.log(error));
  };
  // const onError = (errors, e) => console.log('an error occur', errors, e);

  return (
    <div className="body-container">
      <div className="src-code-container">
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <div className="language-container">
            <h2>Src code</h2>
            <label className="radio-label">
              <input
                type="radio"
                name="language"
                value="java"
                className="radio-custom"
                {...register('selectedLang')}
              />
              <FaJava className="icon" size={40} />
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="language"
                value="c"
                className="radio-custom"
                {...register('selectedLang')}
              />
              <TbHexagonLetterC className="icon" size={40} />
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="language"
                value="c++"
                className="radio-custom"
                {...register('selectedLang')}
              />
              <BiLogoCPlusPlus className="icon" size={40} />
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="language"
                value="c#"
                className="radio-custom"
                {...register('selectedLang')}
              />
              <SiCsharp className="icon" size={40} />
            </label>
          </div>
          <div className="pasted-code-container">
            <textarea name="srcCode" {...register('srcCode')} />
          </div>
          <div className="button-container">
            <button type="submit">Convert</button>
            <button
              type="button"
              onClick={() => {
                reset();
                setSrcCode('');
              }}
            >
              Reset
            </button>
            <input
              type="file"
              name="uploadedFile"
              {...register('uploadedFile')}
            />
          </div>
        </form>
      </div>
      {/* <div className="srcML-container"></div> */}
      <SrcMLCode convertedSrc={srcCode} reset={reset} />
    </div>
  );
}
