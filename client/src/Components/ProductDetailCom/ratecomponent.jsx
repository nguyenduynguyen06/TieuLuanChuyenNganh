import React, { useState } from 'react';
import { Rate } from 'antd';
import { WrapperRate } from './style';
const Rating = () => {
    return (
        <WrapperRate>
            <div className='boxReview'>
                <h2 className='title is-6'>Đánh giá và nhận xét</h2>
                <div className='boxReview-review is-flex'>
                    <div className='boxReview-score is-flex is-justify-content-center is-align-items-center has-product'>
                        <p className='title is-4 m-0 p-0'>4.9/5</p>
                        <div className='item-star'>
                            <Rate disabled allowHalf defaultValue={4} />
                        </div>
                        <p className='boxReview-score__count'>
                            <strong>65</strong> đánh giá
                        </p>
                    </div>
                    <div className='boxReview-star is-flex is-justify-content-space-evenly has-product'>
                        <div className='rating-level is-flex is-align-items-center is-justify-content-space-evenly'>
                            <div className='star-count is-flex is-align-items-center'>
                                <span className='has-text-weight-bold'>5</span>
                                <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 10 100 100">
                                    <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                                </svg>
                                <progress max='65' className='progress is-small m-0' value={58}></progress>
                                <span className='is-size-7'>58 đánh giá</span>
                            </div>
                            <div className='star-count is-flex is-align-items-center'>
                                <span className='has-text-weight-bold'>4</span>
                                <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 10 100 100">
                                    <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                                </svg>
                                <progress max='65' className='progress is-small m-0' value={7}></progress>
                                <span className='is-size-7'>7 đánh giá</span>
                            </div>
                            <div className='star-count is-flex is-align-items-center'>
                                <span className='has-text-weight-bold'>3</span>
                                <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 10 100 100">
                                    <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                                </svg>
                                <progress max='65' className='progress is-small m-0' value={0}></progress>
                                <span className='is-size-7'>0 đánh giá</span>
                            </div>
                            <div className='star-count is-flex is-align-items-center'>
                                <span className='has-text-weight-bold'>2</span>
                                <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 10 100 100">
                                    <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                                </svg>
                                <progress max='65' className='progress is-small m-0' value={0}></progress>
                                <span className='is-size-7'>0 đánh giá</span>
                            </div>
                            <div className='star-count is-flex is-align-items-center'>
                                <span className='has-text-weight-bold'>1</span>
                                <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 10 100 100">
                                    <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                                </svg>
                                <progress max='65' className='progress is-small m-0' value={0}></progress>
                                <span className='is-size-7'>0 đánh giá</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='box-review-filter'>
                    <div className='title is-6' >Lọc theo</div>
                    <div className='filter-container is-flex'>
                        <div className='filter-item active'>Tất cả</div>
                        <div className='filter-item'>Có hình ảnh</div>
                        <div className='filter-item'>Đã mua hàng</div>
                    </div>
                    <div className='filter-container is-flex'>
                        <div className='filter-item star'>
                            <span className='has-text-weight-bold'>1</span>
                            <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 10 100 100">
                                <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                            </svg>
                        </div>
                        <div className='filter-item star'>
                            <span className='has-text-weight-bold'>2</span>
                            <svg class="star-icon" xmlns="http://www.w3.org/2000/svg"  height="15" viewBox="0 10 100 100">
                                <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                            </svg>
                        </div>
                        <div className='filter-item star'>
                            <span className='has-text-weight-bold'>3</span>
                            <svg class="star-icon" xmlns="http://www.w3.org/2000/svg"  height="15" viewBox="0 10 100 100">
                                <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                            </svg>
                        </div>
                        <div className='filter-item star'>
                            <span className='has-text-weight-bold'>4</span>
                            <svg class="star-icon" xmlns="http://www.w3.org/2000/svg"  height="15" viewBox="0 10 100 100">
                                <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                            </svg>
                        </div>
                        <div className='filter-item star'>
                            <span className='has-text-weight-bold'>5</span>
                            <svg class="star-icon" xmlns="http://www.w3.org/2000/svg"  height="15" viewBox="0 10 100 100">
                                <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </WrapperRate>
    );
}
export default Rating;