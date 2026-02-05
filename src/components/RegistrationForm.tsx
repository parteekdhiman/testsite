import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText } from "lucide-react";

interface RegistrationFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

interface FormData {
    fullName: string;
    email: string;
    phone: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess, onCancel }) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Personal Info State
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
    });

    // File States
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string>("");

    const [tenthCertFile, setTenthCertFile] = useState<File | null>(null);
    const [tenthCertData, setTenthCertData] = useState<string>("");

    const [twelfthCertFile, setTwelfthCertFile] = useState<File | null>(null);
    const [twelfthCertData, setTwelfthCertData] = useState<string>("");

    const [higherCertFile, setHigherCertFile] = useState<File | null>(null);
    const [higherCertData, setHigherCertData] = useState<string>("");

    const [cvFile, setCvFile] = useState<File | null>(null);
    const [cvData, setCvData] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file for photo');
                return;
            }
            // Reduced limit to 300KB to stay within Vercel's 4.5MB total limit
            if (file.size > 300 * 1024) {
                alert('Photo size should be less than 300KB. Please compress your image.');
                return;
            }
            setPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleDocumentChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
        setData: React.Dispatch<React.SetStateAction<string>>,
        docName: string
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                alert(`Please select a valid file for ${docName} (PDF, PNG, JPG, or JPEG)`);
                return;
            }
            // Reduced limit to 500KB per document to stay within Vercel's 4.5MB total limit
            if (file.size > 500 * 1024) {
                alert(`${docName} size should be less than 500KB. Please compress your file.`);
                return;
            }
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setData(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!photoFile) {
            alert('Please upload your photo');
            return;
        }
        if (!tenthCertFile) {
            alert('Please upload your 10th Certificate');
            return;
        }
        if (!twelfthCertFile) {
            alert('Please upload your 12th Certificate');
            return;
        }
        if (!higherCertFile) {
            alert('Please upload your Higher Education Certificate');
            return;
        }
        if (!cvFile) {
            alert('Please upload your CV');
            return;
        }

        setIsSubmitting(true);

        try {
            const submissionData = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                photo: photoPreview,
                tenthCertificate: tenthCertData,
                twelfthCertificate: twelfthCertData,
                higherEducationCertificate: higherCertData,
                cv: cvData,
                registrationFee: 299,
            };

            const response = await fetch('https://newusmailer.vercel.app/api/candidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            const result = await response.json();

            if (result.ok) {
                alert('Registration successful! Check your email for confirmation.');
                onSuccess();
            } else {
                alert(result.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helper component for file input to reduce repetition
    const FileUploadField = ({
        id,
        label,
        file,
        onChange
    }: {
        id: string,
        label: string,
        file: File | null,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    }) => (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label
                    htmlFor={id}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-accent transition-colors w-full sm:w-auto"
                >
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">Choose File</span>
                    <input
                        id={id}
                        name={id}
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={onChange}
                        className="hidden"
                    />
                </label>
                {file ? (
                    <span className="text-sm text-green-600 font-medium truncate max-w-[200px]">
                        ✓ {file.name}
                    </span>
                ) : (
                    <span className="text-xs text-muted-foreground">
                        PDF, PNG, JPG (Max 500KB)
                    </span>
                )}
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground border-b pb-2">Personal Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Documents Section */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground border-b pb-2">Documents Upload</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUploadField
                        id="tenth_cert"
                        label="10th Certificate *"
                        file={tenthCertFile}
                        onChange={(e) => handleDocumentChange(e, setTenthCertFile, setTenthCertData, "10th Certificate")}
                    />

                    <FileUploadField
                        id="twelfth_cert"
                        label="12th Certificate *"
                        file={twelfthCertFile}
                        onChange={(e) => handleDocumentChange(e, setTwelfthCertFile, setTwelfthCertData, "12th Certificate")}
                    />

                    <FileUploadField
                        id="higher_cert"
                        label="Higher Education Certificate *"
                        file={higherCertFile}
                        onChange={(e) => handleDocumentChange(e, setHigherCertFile, setHigherCertData, "Higher Education Certificate")}
                    />

                    <FileUploadField
                        id="cv_upload"
                        label="Curriculum Vitae (CV) *"
                        file={cvFile}
                        onChange={(e) => handleDocumentChange(e, setCvFile, setCvData, "CV")}
                    />
                </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground border-b pb-2">Candidate Photo</h4>
                <div className="space-y-2">
                    <Label htmlFor="photo">Upload Photo *</Label>
                    <div className="flex items-center gap-4">
                        <label
                            htmlFor="photo"
                            className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-accent transition-colors"
                        >
                            <Upload className="h-4 w-4" />
                            <span className="text-sm">Choose Photo</span>
                            <input
                                id="photo"
                                name="photo"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                        </label>
                        {photoFile && (
                            <span className="text-sm text-green-600 font-medium">{photoFile.name}</span>
                        )}
                    </div>
                    {photoPreview && (
                        <div className="mt-2">
                            <img
                                src={photoPreview}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-lg border border-border bg-muted"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Registration Fee Display */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-base font-semibold text-primary">
                    Registration Fee: ₹299
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                    * The registration fee is payable separately. This form is for data collection only.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-primary to-pink-600 hover:opacity-90">
                    {isSubmitting ? 'Submitting Application...' : 'Submit Registration'}
                </Button>
            </div>
        </form>
    );
};

export default RegistrationForm;
