import './Btn.css'

const Btn = (props) => {
  const {content, func, className, id} = props;
  return (
    <button id={id} className={className} onClick={func}>{content}</button>
  )
}

export default Btn;
