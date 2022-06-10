import React, { memo, useContext } from 'react';
import { Context } from '../../Context';
import { GiWaterDrop } from 'react-icons/gi';
import { IoCloudSharp } from 'react-icons/io5';
import { RiTempColdFill } from 'react-icons/ri';
import { FaRegEye } from 'react-icons/fa';
import { motion } from 'framer-motion';
import EachDayDataCard from '../secondary/EachDayDataCard';

//fijate que si bien components/primary y components/secondary implica algo
//acerca de la importancia de los componentes que estan adentro, no deja muy
//bien en claro que, podrias tener ponele components/pages, components/general
//y si los compontes son especificos de una pagina, hacete una carpeta components
//adentro de la carpeta de la pagina, asi no contaminas todo lo demas con componentes
//que son especificos de una sola pag, hago lo mismo con los archivos de sass yo

//podes sacar props si no se usa, no esta mal es solamente best practice
const CityData = memo((props) => {
	const { currentDayDataContainer } = useContext(Context);

	//si quisieras (realmente no es obligatorio) podrias hacer
	//const { humidity, clouds, min:t_min, max:t_max, visibility } = currentDayDataContainer;
	//lo que haces es renombrar min a t_min y max a t_max cuando deconstruis currentDayDataContainer

	const { humidity, clouds, min, max, visibility } = currentDayDataContainer;

	//weatherData o completeWeatherData funcionaria mejor
	//en lugar de title podrias poner type tambien, aunque si el array se usa para
	//renderizar cosas title tambien funciona
	//currentNumber -> value
	const arrayOfAllData = [
		{
			title: 'Humidity',
			currentNumber: `${humidity} %`,
			icon: <GiWaterDrop className='icon' />,
		},
		{
			title: 'Clouds',
			currentNumber: `${clouds} %`,
			icon: <IoCloudSharp className='icon' />,
		},
		{
			title: 'Min / Max',
			currentNumber: `${min}° / ${max}°`,
			icon: <RiTempColdFill className='icon' />,
		},
		{
			title: 'Visibility',
			currentNumber: `${visibility} km`,
			icon: <FaRegEye className='icon' />,
		},
	];

	function getAllInfoCarts() {
		return arrayOfAllData.map((item, index) => (
			<EachDayDataCard key={index} title={item.title} currentNumber={item.currentNumber} icon={item.icon} />
		));
	}

	return (
		<motion.div
			className='city-data'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ ease: 'easeOut', duration: 0.6, delay: 0.2 }}>
			{getAllInfoCarts()}
		</motion.div>
	);
});

export default CityData;
