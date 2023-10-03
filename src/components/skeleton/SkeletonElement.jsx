import './Skeleton.css'

function SkeletonElement({type, type2}) {
    const classes = `skeleton ${type}`
    const secondaryClasses = `${type2}`
  return (
    <div className={classes}>
        <div className={secondaryClasses}></div>
    </div>
  )
}

export default SkeletonElement