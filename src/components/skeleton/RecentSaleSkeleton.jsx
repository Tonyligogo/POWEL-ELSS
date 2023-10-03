import React from 'react'
import SkeletonElement from './SkeletonElement'
import Shimmer from './Shimmer'

function RecentSaleSkeleton() {
  return (
    <div className="skeletonWrapper">
        <Shimmer/>
        <div className='recentSaleSkeleton'>
            <SkeletonElement type='recentSales' type2='text'/>
            <SkeletonElement type='recentSales' type2='text'/>
            <SkeletonElement type='recentSales' type2='text'/>
        </div>
    </div>
  )
}

export default RecentSaleSkeleton