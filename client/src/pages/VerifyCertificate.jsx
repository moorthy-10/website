import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundGlow from '@/components/BackgroundGlow';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import logoWithSparkle from "@/assets/logo.png";
import logoIcon from "@/assets/logo-white.svg";

const VerifyCertificate = () => {
    const navigate = useNavigate();
    // Steps: 'request' | 'verified'
    const [step, setStep] = useState('request');
    const [certificateId, setCertificateId] = useState('');
    const [email, setEmail] = useState('');

    // Mock data for verified state
    const [verifiedData, setVerifiedData] = useState({
        name: 'John Doe',
        program: 'AI Automation Engineer',
        startDate: '10/01/2025',
        endDate: '12/02/2025',
        certId: 'GL/INT/123'
    });

    const isRequestValid = certificateId.trim().length > 0 && email.trim().length > 0;

    const handleVerify = (e) => {
        e.preventDefault();
        if (isRequestValid) {
            setStep('verified');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-5 sm:p-8 md:p-12 font-['Clash Display',sans-serif] overflow-x-hidden">
            <BackgroundGlow />

            <AnimatePresence mode="wait">
                {step === 'request' && (
                    <motion.div
                        key="request"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full max-w-[480px] z-10 text-center"
                    >
                        <div className="flex justify-center mb-8 sm:mb-12">
                            <Link to="/">
                                <img src={logoWithSparkle} alt="GenLab" className="h-[40px] sm:h-[50px] w-auto" />
                            </Link>
                        </div>

                        <div className="mb-10 sm:mb-16 px-4">
                            <h2 className="text-[24px] sm:text-[36px] leading-tight sm:leading-[46px] font-medium font-clash text-white">
                                Verify Your Certificate
                            </h2>
                        </div>

                        <form onSubmit={handleVerify} className="flex flex-col gap-6 sm:gap-8 px-4 sm:px-10">
                            <InputField
                                label="Certificate ID"
                                id="cert-id"
                                placeholder="GL/INT/123"
                                value={certificateId}
                                onChange={(e) => setCertificateId(e.target.value)}
                            />

                            <InputField
                                label="Registered Email"
                                id="reg-email"
                                type="email"
                                placeholder=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div className="pt-10 sm:pt-16">
                                <Button
                                    type="submit"
                                    disabled={!isRequestValid}
                                    variant="secondary"
                                >
                                    Verify Certificate
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {step === 'verified' && (
                    <motion.div
                        key="verified"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full max-w-[520px] z-10 text-center"
                    >
                        <div className="flex justify-center mb-8 sm:mb-10">
                            <img src={logoWithSparkle} alt="GenLab" className="h-[35px] sm:h-[45px] w-auto" />
                        </div>

                        <div className="mb-16 sm:mb-26 px-4">
                            <h2 className="text-[28px] sm:text-[42px] leading-tight font-medium text-white">
                                Certificate Verified
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4 sm:gap-6 text-left px-5 sm:px-12">
                            <InputField label="Name" value={verifiedData.name} readOnly />

                            <InputField label="Program" value={verifiedData.program} readOnly />

                            <div className="flex flex-col sm:flex-row gap-6 sm:gap-5">
                                <InputField label="Start Date" value={verifiedData.startDate} readOnly />
                                <InputField label="End Date" value={verifiedData.endDate} readOnly />
                            </div>

                            <InputField label="Certificate ID" value={verifiedData.certId} readOnly />

                            <div className="pt-10 sm:pt-14">
                                <Button variant="primary" onClick={() => navigate('/')}>
                                    Done
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute bottom-6 sm:bottom-10 left-0 right-0 text-center text-[12px] sm:text-[13px] text-gray-500 font-medium px-6"
            >
                <p>
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </motion.footer>
        </div>
    );
};

export default VerifyCertificate;
