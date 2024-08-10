import Navbar from '@/components/Navbar';
import { Formik, Form, Field } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
});

const Checkout: React.FC = () => {

  const [step, setStep] = React.useState(0);

  const Step1 = () => (
    <motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='flex justify-start flex-wrap gap-12 p-4'>
      <label className="block">
            <Field
              type="text"
              name="country"
              placeholder="País"
              className="mt-1 block w-full outline-none rounded-md border shadow-sm p-2"
            />
          </label>
      </motion.div>
    </motion.div>
  );


  const steps = [<Step1 />];


  return (
    <>
    <Navbar />
    
    <div className="container mx-auto p-4">
      <h1 className="mt-6 text-2xl text-[#0088cc] font-semibold text-center">Meu carrinho</h1>
    </div>

    <div className="container mx-auto max-w-[1260px]">
      <div className="container w-full flex justify-center rounded-[6px] bg-white gap-3 flex-col border-[1px] border-[#d8d8d8] p-6 mb-8 mt-4">
      <Formik
          initialValues={{ firstName: '', lastName: '' }}
          validationSchema={validationSchema}
          onSubmit={values => console.log(values)}
        >
          {({ isSubmitting }) => (
            <Form>
              {steps[step]}
              
              <div className="flex justify-between w-full p-4">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className={`px-4 py-2 font-semibold rounded-md transition-colors duration-300 flex items-center space-x-2 text-[#0088cc] border-2 border-[#0088cc] bg-transparent hover:bg-blue-700`}
                  >
                    <span>VOLTAR</span>
                  </button>
                )}
                
                {step === steps.length - 1 && (
                  <button
                    type="button"
                    onClick={() => console.log('submit')}
                    className={`px-4 py-2 font-semibold text-white rounded-lg transition-colors duration-300 flex items-center space-x-2 bg-[#0088cc] hover:bg-[#3a84c0]`}
                  >
                    <span>ADICIONAR AO CARRINHO</span>
                  </button>
                )}
              </div>

              {step < steps.length - 1 && (
                <div className="flex justify-end w-full p-4">
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span>PRÓXIMO</span>
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </>
  );
};

export default Checkout;
