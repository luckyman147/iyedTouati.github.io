import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';
import SectionHeading from './SectionHeading';
import Slider from 'react-slick';
import Modal from './Modal';

export default function Projects({ data }) {
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('image');
  const [modalData, setModalData] = useState({});
  const sliderRef = useRef(null);
  const { sectionHeading, allProjects } = data;

  const handelProjectDetails = (item, itemType) => {
    if (item.videoUrl) {
      setModalData(item);
      setModalType('details');
    } else {
      setModalData(item);
      setModalType(itemType);
    }
    setModal(true);
  };

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    cssEase: 'cubic-bezier(0.22, 1, 0.36, 1)',
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <>
      <section className="project-section section gray-bg" id="project">
        <div className="container">
          <div className="project-header">
            <SectionHeading
              miniTitle={sectionHeading.miniTitle}
              title={sectionHeading.title}
            />
            <div className="slider-nav-group">
              <button
                className="slider-nav"
                onClick={() => sliderRef.current?.slickPrev()}
                aria-label="Previous project"
              >
                <Icon icon="bi:arrow-left" />
              </button>
              <button
                className="slider-nav"
                onClick={() => sliderRef.current?.slickNext()}
                aria-label="Next project"
              >
                <Icon icon="bi:arrow-right" />
              </button>
            </div>
          </div>
        </div>
        <div
          className="project-slider-wrapper"
          data-aos="fade"
          data-aos-duration="1200"
          data-aos-delay="400"
        >
            <Slider ref={sliderRef} {...settings} className="slider-gap-24">
              {allProjects?.map((item, index) => (
                <div key={index} className="px-2">
                  <div className="project-box">
                    <div className="project-badge">#{index + 1 < 10 ? `0${index + 1}` : index + 1}</div>
                    <div className="project-media">
                      <img src={item.thumbUrl} alt="Thumb" />
                      <span
                        className="gallery-link"
                        onClick={() => handelProjectDetails(item, 'image')}
                      >
                        <i>
                          <Icon icon={item.videoUrl ? 'bi:play-fill' : 'bi:plus'} />
                        </i>
                      </span>
                    </div>
                    <div className="project-body">
                      <div className="text">
                        <h5>{item.title}</h5>
                        <div className="project-keywords">
                          {item.details?.frameworks?.split(',').slice(0, 3).map((kw, i) => (
                            <span key={i} className="keyword-pill">
                              {kw.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="link">
                        <span
                          className="p-link"
                          onClick={() => handelProjectDetails(item, 'details')}
                        >
                          <Icon icon="bi:arrow-right" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
        </div>
      </section>
      {modal && (
        <div className="mfp-wrap">
          <div className="mfp-container">
            <div className="mfp-bg" onClick={() => setModal(!modal)}></div>
            <div className="mfp-content">
              <button
                type="button"
                className="mfp-close"
                onClick={() => setModal(!modal)}
              >
                ×
              </button>
              {modalType === 'image' ? (
                <img src={modalData.thumbUrl} alt="Thumbnail" />
              ) : (
                <Modal modalData={modalData} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
