import { CardInterface } from "../types"
import Button from "../Button/Button"
import styles from '../../../styles/card.module.css'

const Card = ({body,btn,title,image, subtitle}: CardInterface) => {
  return (
    <article className={`stack-lg ${styles.card}`}>

      {image &&
        <img src={image} alt="Random Image" className={styles.image} />
      }
      <div className="stack-sm">
        <h3 className={styles.title}>{title}</h3>
        {subtitle &&
          <small className={styles.subtitle}>{subtitle}</small>
        }
      </div>
      <p className={styles.body}>{body}</p>
      <Button
        filled={btn.filled}
        type={btn.type}
        text={btn.text}
        href={btn.href}
        icon={btn.icon}
      />
    </article>
  )
}
export default Card