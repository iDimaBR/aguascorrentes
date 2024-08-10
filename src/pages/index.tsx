import React, { useState } from 'react';
import TimePicker from '../components/TimePicker';
import Calendar from '../components/Calendar';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon } from '@heroicons/react/outline';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
});

const Home: React.FC = () => {

  const ticketPrice = 49.00;
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = React.useState(0);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const handleCheckout = () => {
    alert('Compra realizada com sucesso!');
  };

  const Step1 = () => (
    <motion.div>
      <h2 className="text-2xl font-semibold text-[#0088cc] mb-2 text-left bg-[#f5f5f5] p-6">AGUAS CORRENTES PARK</h2>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='flex justify-start flex-wrap gap-12 p-4'>
        <motion.div className="pl-2 grid grid-cols-1">
          <Calendar onDateChange={handleDateChange} />
        </motion.div>
        <motion.div className="grid grid-cols-1 border-l-2 border-dashed border-opacity-80 border-l-[#6b7280] pl-12">
          <TimePicker onTimeChange={handleTimeChange} />
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const Step2 = () => (
    <motion.div>
      <h2 className="text-md text-black border-b-2 text-left bg-[#f5f5f5] p-6">
        Informações de sua visita para: <span className="font-semibold text-[#0088cc]"> AGUAS CORRENTES PARK</span><br/>
        <div className="flex gap-6">
          <div className="flex">
            <CalendarIcon className="h-5 w-5 mr-2 text-[#0088cc]" /> {selectedDate ? selectedDate.toLocaleDateString() : 'N/A'}
          </div>
          <div className="flex">
            <ClockIcon className="h-5 w-5 mr-2 text-[#0088cc]"/>{selectedTime || 'N/A'}
          </div>
        </div>
      </h2>
      <h2 className="text-lg font-semibold text-[#0088cc] mb-2 text-left bg-[#f5f5f5] p-6">Quem irá visitar?</h2>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
        <div className="grid grid-cols-1 gap-6">

        <div className="p-2 w-full border rounded-lg flex items-center justify-between">
          <h2 className="text-md font-semibold text-black">
            Day Use - Adulto (R$ {ticketPrice.toFixed(2)})
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={decrementQuantity}
              className="px-3 py-2 bg-[#0088cc] text-white rounded-full disabled:bg-[#e6e5e5]"
              disabled={quantity === 0}
            >
              -
            </button>
            <span className="text-lg font-bold">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="px-3 py-2 bg-[#0088cc] text-white rounded-full"
            >
              +
            </button>
          </div>
        </div>
          
        <label className="block">
            <Field
              type="text"
              name="country"
              placeholder="País"
              className="mt-1 block w-full outline-none rounded-md border shadow-sm p-4"
            />
          </label>

          <label className="block">
            <Field
              type="text"
              name="cep"
              placeholder="CEP de origem do visitante*"
              className="mt-1 block w-full outline-none rounded-md border shadow-sm p-4"
            />
          </label>

          <label className="block">
            <Field
              type="text"
              name="estado"
              placeholder="Estado de origem do visitante*"
              className="mt-1 block w-full outline-none rounded-md border shadow-sm p-4"
            />
          </label>

          <label className="block">
            <Field
              type="text"
              name="municipio"
              placeholder="Município"
              className="mt-1 block w-full outline-none rounded-md border shadow-sm p-4"
            />
          </label>

        </div>

        {quantity > 0 && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="mt-4 text-[20px] font-semibold text-[#0088cc] text-right">
              Valor Total: R$ {totalPrice.toFixed(2)}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );


  const steps = [<Step1 />, <Step2 />];

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const totalPrice = quantity * ticketPrice;

  return (
    <>
    <Navbar />
    <div className="container mx-auto max-w-[1260px]">
      <div className="container w-full flex justify-center rounded-[6px] bg-white gap-3 flex-col border-b-4 border-t-[1px] border-l-[1px] border-r-[1px] border-r-[#d8d8d8] border-l-[#d8d8d8] border-t-[#d8d8d8] border-b-[#0088cc] p-6 mb-8 mt-4">
        <h2 className="text-2xl font-bold text-black mb-2 text-left">INGRESSO ADULTO</h2>
        <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-6">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <Image
              src="/banner.png"
              alt="Imagem do Banner"
              width={500}
              height={300}
              className="rounded-lg shadow-md object-cover w-full bg-white aspect-4/3"
            />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-[14px] text-black">
            <b>Pagando em PIX tem desconto! Use o cupom PIX5 e ganhe 5% desconto no seu ingresso</b><br />
            <b><span className="text-[#00008b]">Importante</span></b><br />
            Este ingresso é vendido somente no e-commerce. Este ingresso dá direito à <b>01 ingresso Adulto</b>.<br />
            - Lotes Limitados, sujeito a alteração de valores sem aviso prévio.<br />
            - Gratuidade:  Crianças até 4 anos e 11 meses e 29 dias <br />
            <br />
            <b>Valores de Bilheteria</b><br />
            Adulto - R$ 80,00 - Acima de 11 anos<br />
            Infantil - R$ 60,00 - De 05 a 11 anos<br />
            Sênior - R$ 40,00 - Acima de 60 anos e PNE / TEA*<br />
            *Necessário apresentar carteirinha&nbsp;BPC&nbsp;ou&nbsp;CIPTEA).<br />
            <br />
            <b>Horários</b><br />
            Parque: 09h00 às 17h00<br />
            <br />
            Qualquer problema ao realizar a compra, por gentileza entrar em contato (61) 3030-4300.<br />
            <br />
            Boa compra e bom divertimento!<br />
            <br />
            <b>Não esqueça de trazer o seu QR Code do ingresso impresso ou salvo no aparelho para apresentar na bilheteria no dia da sua visita!</b><br />
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between bg-white gap-3 flex-col shadow-lg border-b-4 border-[#0088cc] p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#0088cc] mb-2 text-left">Pagando em PIX tem 5% de desconto</h2>
        <br />
        Após incluir os ingressos no carrinho, selecione a opção de pagamento: PIX.<br />
        Inserindo o código: PIX5 receba 5% de desconto.<br />

      </div>

      <div className={`w-full flex justify-between bg-white gap-3 flex-col shadow-lg border-b-4 border-[#0088cc] mb-16 ${step === 0 ? '' : 'border-b-[#0088cc]'}`}>
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
                    onClick={handleCheckout}
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

        {step === 0 && (
          <h2 className="text-md text-[#777777] font-[450] text-left bg-[#f5f5f5] p-4 border-t-[1px]">Quem irá visitar?</h2>
        )}

      </div>

      <div className="w-full flex flex-col bg-white shadow-lg border-b-4 border-[#0088cc] mb-16 relative">
        <div className="p-8">
          <div className="relative">
            <Image src="/pastel.png" alt="Banner do pastel" width={593} height={334} className="rounded-md" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-transparent to-transparent rounded-md w-[600px] shadow-lg" />
            <h2 className="absolute bottom-0 left-0 p-4 text-[20px] text-white font-semibold z-10 shadow-lg">
              Combo pastel e caldo de cana
            </h2>
          </div>
        </div>
      </div>

    </div>

    <div className="w-full flex bg-[#0088cc] flex-col justify-center items-center">

      <div className="p-8">
        <Image src="/logo.png" alt="Logo" width={200} height={130} />
      </div>
        
      <div className="flex gap-6 mb-4">
        <a href="#"><Image src="/insta.png" alt="Instagram" width={24} height={24} /></a>
        <a href="#"><Image src="/zap.png" alt="Whatsapp" width={24} height={24} /></a>
      </div>

      <div className="flex flex-row gap-3 p-8 border-b-[1px] border-lime-300">
        <div className="flex flex-col text-[12px] max-w-[680px] text-center">
          <h1 className="text-yellow-200 text-[12px] font-semibold">SOBRE NÓS</h1>
          <p className="text-white">
          Piscinas naturais e aquecidas, rampas e toboáguas, cachoeiras e cascatas naturais e artificiais, trilhas naturais, área verde, lanchonetes e restaurante, e muito mais, tudo isso em pleno contato com a natureza exuberante do Águas Correntes Park.
          </p>
        </div>
        <div className="flex flex-col text-[12px] text-center">
          <h1 className="text-yellow-200 text-[12px] font-semibold">CONTATO</h1>
          <p className="text-white">
            Rodovia BR 040 Km 05, DF-495 Km 06.<br/>
            Sentido Brasília-Valparaíso, Entrada no Monumento Solárius (Chifrudo) 6 km.<br/>
            61 3030 4300<br/>
            <br/>
            atendimento@aguascorrentes.com.br<br/>
            Horário de funcionamento: todos os dias das 9h às 17h, exceto às quartas. Quarta-feira: FECHADO.<br/>
          </p>
        </div>
      </div>

      <div className="flex flex-row p-8 flex-wrap justify-around mt-8 gap-40">
        <div className="flex flex-col text-[12px] max-w-[680px] gap-3 text-center">
          <h1 className="text-yellow-200 text-[12px] font-semibold">Faça seu login</h1>
          <a href="#" className="text-white">Entrar</a>
          <a href="#" className="text-white">Cadastrar</a>
        </div>
        <div className="flex flex-col text-[12px] max-w-[680px] gap-3 text-center">
          <h1 className="text-yellow-200 text-[12px] font-semibold">Compra Segura</h1>
          <a href="#" className="text-white">Política de cookies</a>
          <a href="#" className="text-white">Termo de Consentimento para Compras Online</a>
          <a href="#" className="text-white">Perguntas Frequentes</a>
        </div>
        <div className="flex flex-col text-[12px] max-w-[680px] gap-3 text-center">
          <h1 className="text-yellow-200 text-[12px] font-semibold">Contato</h1>
          <a href="#" className="text-white">Fale Conosco</a>
        </div>
      </div>

      <div className="flex flex-row gap-3 mt-4 text-yellow-200 text-[10px]">
        <a href="#">Limber Software - A plataforma de soluções para o turismo e entretenimento.</a>
      </div>
      
        
    </div>
    </>
  );
};

export default Home;
