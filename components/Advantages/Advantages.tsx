import {AdvantagesProps} from './Advantages.props';
import styles from './Advantages.module.css';
import CheckIcon from './check.svg';

export const Advantages = ({ advantages }: AdvantagesProps) => {
	return (
		<>
			{advantages.map((advantage) => (
				<div key={advantage._id} className={styles.advantage}>
					<CheckIcon/>
					<div className={styles.title}>{advantage.title}</div>
					<hr className={styles.vline}/>
					<div >{advantage.description}</div>
				</div>
			))}
		</>
	);
};

