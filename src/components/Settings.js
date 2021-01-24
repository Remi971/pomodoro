import Btn from './Btn';

const Settings = (props) => {
  const {id, content, value, func} = props;
  return (
    <div className="option" >
      <h5 id={id + '-label'}>{content}</h5>
      <div className='wrap-settings'>
        <Btn
          id={id + '-decrement'}
          className='btn-settings'
          content='-'
          func={func}
        />
        <p  id={id + '-length'}>{value}</p>
        <Btn
          id={id + '-increment'}
          className='btn-settings'
          content='+'
          func={func}
        />
      </div>
    </div>
  )
}

export default Settings;
