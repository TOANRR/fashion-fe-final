import React from 'react';
import servicesData from './ServiceData';
import SectionsHead from './SectionHead';
import './ServiceStyle.css'


const ServiceSupport = () => {
    return (
        <>


            <div className="wrapper services_wrapper">
                {
                    servicesData.map((item) => {
                        const { id, icon, title, info } = item;

                        return (
                            <div className="services_card" key={id}>
                                <div className="services_icon">{icon}</div>
                                <div className="services_details">
                                    <h4>{title}</h4>
                                    <p>{info}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>


        </>
    );
};

export default ServiceSupport;