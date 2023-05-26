import './Loader.scss';

/**
 * @deprecated Устарело, используйте новый компонент редизайна
 */
const Loader = () => {
	return (
		<div>
			<div className="lds-ellipsis">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loader;
