interface Props {
  activeStep: 1 | 2 | 3
}

const CheckoutStepIndicator: React.FC<Props> = ({ activeStep }) => {
  return (
    <div className="flex items-center justify-center opacity-90">
      <Step step={1} isActive={activeStep === 1} />
      <span className="h-[1px] w-[40px] bg-slate-200 mx-2" />
      <Step step={2} isActive={activeStep === 2} />
      <span className="h-[1px] w-[40px] bg-slate-200 mx-2" />
      <Step step={3} isActive={activeStep === 3} />
    </div>
  )
}

const Step = ({ step, isActive }: { step: number; isActive: boolean }) => {
  const className = `flex items-center justify-center text-xl w-[40px] h-[40px] font-bold ${
    isActive ? "bg-black text-white rounded-[50%]" : null
  }`

  return <span className={className}>{step}</span>
}

export default CheckoutStepIndicator
