import React, { Component } from "react"
import styles from '../../views/styles/tagsInput.module.css'

class TagInput extends Component{
    
	

    removeTags = (index) => {
		const updated=[...this.props.tags.filter((_, idx) => idx !== index)]
		this.props.updateTags(updated)
    }

    addTags = (event) => {
        if (event.target.value !== "") {
					this.props.updateTags([...this.props.tags, event.target.value])

			event.target.value = "";
			
		}
    }

    render() {
        return (
        <div className={styles.tagsInput}>
			<ul className={styles.tags}>
				{this.props.tags.map((tag, index) => (
					<li key={index} className={styles.tag}>
						<span className={styles.tagTitle}>{tag}</span>
						<span className={styles.tagCloseIcon}
							onClick={() => this.removeTags(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>
			<input
				type="text"
				onKeyUp={event => (event.key === "Enter") ? this.addTags(event) : null}
				placeholder="Press enter to add tags"
			/>
		</div>
    )
}
}

export default TagInput