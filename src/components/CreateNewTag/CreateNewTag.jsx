import './CreateNewTag.scss'
import { ICON_FULL_ARROW_RIGHT, ICON_FOLDER } from '../../assets/icons'

const CreateNewTag = () => {
    return (
        <div className='create-new-tag-container'>
            <div className='create-new-tag-header'>
                <input type="text" placeholder='Title' size='5' />
                <div className='tag-icon'>
                    <img src={ICON_FOLDER}/>
                </div>
            </div>
            <div className='create-new-tag-desc'>
                <input type="text" placeholder="Write your tag description here"></input>
            </div>
            <div className='create-new-tag-add-tasks'>
                <div style={{marginRight: '20px'}}>+</div>
                <div>Add to task</div>
            </div>
            <div className='create-new-btn'>
                <span style={{marginRight: '10px'}}>Create</span>
                <img src={ICON_FULL_ARROW_RIGHT}></img>
            </div>
        </div>
    )
}

export default CreateNewTag