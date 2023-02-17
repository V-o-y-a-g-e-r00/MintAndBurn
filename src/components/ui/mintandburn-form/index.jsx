import { useStyles } from './styles';

import MintandburnButton from '../mintandburn-button'

const MintandburnForm = () => {
    const classes = useStyles();
    return (
        <section className={classes.testSection}>
            <div className={classes.mintandburnForm}>
                <div className="header">
                    <div className="icon-holder">
                        icon
                    </div>
                    <div className="gap">

                    </div>
                    <div className="text-holder margin-right">
                        Mint Gcoin
                    </div>
                </div>
                <div className='amount-container'>
                    <div className='right-size-container'>
                        Balance: 0
                    </div>
                    <div className='input-container'>
                        <input type="text" placeholder='Enter'/>
                        <div className='max-amount-container'>
                            Max
                        </div>
                    </div>
                    <div className='right-size-container'>
                        Min amount: 0
                    </div>
                </div>
                <div className='details-list'>


                    <div className='details-item'>
                        <div className='property-name'>
                            You will pay
                        </div>
                        <div className='property-value'>
                            N/A
                        </div>
                    </div>
                    <div className='details-item'>
                        <div className='property-name'>
                            You will pay
                        </div>
                        <div className='property-value'>
                            N/A
                        </div>
                    </div>
                    <div className='details-item'>
                        <div className='property-name'>
                            You will pay
                        </div>
                        <div className='property-value'>
                            N/A
                        </div>
                    </div>




                </div>
                <div className='button-component'>

                <MintandburnButton onClick={null} name='Mint' />


                </div>
            </div>
        </section>
    )
}
export default MintandburnForm;