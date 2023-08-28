abstract class Person {
    protected _firstName: string;
    protected _lastName: string;
    protected _age: number;
    protected _address: string;

    constructor(firstName: string, lastName: string, age: number, address: string) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._age = age;
        this._address = address;
    }

    getFullName(): string {
        return `${this._firstName} ${this._lastName} ${this._age} ${this._address}`;
    }
}

class Patient extends Person {
    protected _patientID: number;
    phoneNumber: number;
    emergencyContact: number;
    medicalHistory: string[];

    constructor(firstName: string, lastName: string, age: number, address: string, patientID: number, phoneNumber: number =0, emergencyContact: number=0, medicalHistory: string[]){
        super(firstName, lastName, age, address);
        this._patientID = patientID;
        this.phoneNumber = phoneNumber;
        this.emergencyContact = emergencyContact;
        this.medicalHistory = medicalHistory;
    }

    getPatientID(): number {
        return this._patientID;
    }

    displayDetails(): void {
        console.log(`Patient ID: ${this._patientID}`);
        console.log(`Name: ${this.getFullName()}`);
        console.log(`Age: ${this._age}`);
        console.log(`Address: ${this._address}`);
        console.log(`Phone Number: ${this.phoneNumber}`);
        console.log(`Emergency Contact: ${this.emergencyContact}`);
        console.log(`Medical History: ${this.medicalHistory.join(', ')}`);
    }

    updateMedicalHistory(newEntry: string): void {
        this.medicalHistory.push(newEntry);
        console.log(`Updated medical history for ${this.getFullName()}`);
    }
}
class MedicalStaff extends Person {
    protected _staffID: number;
    protected _position: string;
    protected _department: string;

    constructor(firstName: string, lastName: string, age: number, address: string, staffID: number, position: string, department: string) {
        super(firstName, lastName, age, address);
        this._staffID = staffID;
        this._position = position;
        this._department = department;
    }
}

class Doctor extends MedicalStaff {
    protected doctorID: number;
    specialization: string;
    availability: string[];
    minAge: any;
    maxAge: any;

    constructor(firstName: string, lastName: string, age: number, address: string, specialization: string, doctorID: number, staffID: number, position: string, department: string) {
        super(firstName, lastName, age, address, staffID, position, department);
        this.doctorID = doctorID;
        this.specialization = specialization;
        this.availability = [];
    }

    addAvailability(timeSlot: string): void {
        this.availability.push(timeSlot);
    }

    removeAvailability(timeSlot: string): void {
        const index = this.availability.indexOf(timeSlot);
        if (index !== -1) {
            this.availability.splice(index, 1);
        }
    }

    getAvailability(): string[] {
        return this.availability;
    }

    getDoctorID(): number {
        return this.doctorID;
    }

    displayDetailsDoctor(): void {
        console.log(`Doctor ID: ${this.doctorID}, Specialization: ${this.specialization}`);
        console.log(`Name: ${this.getFullName()}`);
    }

    treatPatient(patient: Patient): void {
        console.log(`${this.getFullName()} is treating ${patient.getFullName()}`);
    }
}

enum AppointmentStatus {
    Planned = "planned",
    Completed = "completed",
    Cancelled = "cancelled"
}

class Appointment {
    patient: Patient;
    doctor: Doctor;
    date: string;
    time: string;
    status: AppointmentStatus;


    constructor(patient: Patient, doctor: Doctor, date: string, time: string, status: AppointmentStatus) {
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time = time;
        this.status = status;

    }

    printAppointmentDetails(): void {
        console.log(`Appointment Details:`);
        console.log(`Patient: ${this.patient.getFullName()}`);
        console.log(`Doctor: ${this.doctor.getFullName()}`);
        console.log(`Date: ${this.date}`);
        console.log(`Time: ${this.time}`);
        console.log(`status: ${this.status}`);

    }
    markAsCompleted(): void {
        this.status = AppointmentStatus.Completed;
        console.log(`Appointment for ${this.patient.getFullName()} marked as completed.`);
    }

    markAsCancelled(): void {
        this.status = AppointmentStatus.Cancelled;
        console.log(`Appointment for ${this.patient.getFullName()} marked as cancelled.`);
    }
}
class MedicalRecord {
    patient: Patient;
    doctor: Doctor;
    diagnosis: string;
    prescription: string;

    constructor(patient: Patient, doctor: Doctor, diagnosis: string, prescription: string) {
        this.patient = patient;
        this.doctor = doctor;
        this.diagnosis = diagnosis;
        this.prescription = prescription;
    }

    displayRecord(): void {
        console.log(`Medical Record for Patient: ${this.patient.getFullName()}`);
        console.log(`Doctor: ${this.doctor.getFullName()}`);
        console.log(`Diagnosis: ${this.diagnosis}`);
        console.log(`Prescription: ${this.prescription}`);
    }
}
class Hospital {
    name: string;
    patients: Patient[] = [];
    doctors: Doctor[] = [];
    appointments: Appointment[] = [];
    medicalRecords: MedicalRecord[] = [];

    constructor(name: string, patients: Patient[] = [], doctors: Doctor[] = [], appointments: Appointment[] = [], medicalRecords: MedicalRecord[] = []) {
        this.name = name;
        this.patients = patients;
        this.doctors = doctors;
        this.appointments = appointments;
        this.medicalRecords = medicalRecords;
    }

    createMedicalRecord(patient: Patient, doctor: Doctor, diagnosis: string, prescription: string): void {
        const medicalRecord = new MedicalRecord(patient, doctor, diagnosis, prescription);
        this.medicalRecords.push(medicalRecord);
        console.log("Medical record created successfully.");
    }

    getMedicalRecords(patient: Patient): MedicalRecord[] {
        const patientRecords = this.medicalRecords.filter(record => record.patient === patient);
        return patientRecords;
    }

    getDoctorSchedule(doctor: Doctor, date: string): Appointment[] {
        const doctorAppointments = this.appointments.filter(appointment =>
            appointment.doctor === doctor && appointment.date === date
        );
        return doctorAppointments;
    }

    getDoctorAvailability(doctor: Doctor, date: string): string[] {
        const allTimeSlots = ["10:00 AM", "11:00 AM", "12:00 PM",];

        const doctorAppointments = this.getDoctorSchedule(doctor, date);
        const reservedTimeSlots = doctorAppointments.map(appointment => appointment.time);

        const availableTimeSlots = allTimeSlots.filter(timeSlot => !reservedTimeSlots.includes(timeSlot));
        return availableTimeSlots;
    }

    searchDoctorBySpecialty(specialty: string): Doctor[] {
        const doctorsWithSpecialty = this.doctors.filter(doctor => doctor.specialization === specialty);
        return doctorsWithSpecialty;
    }


    addPatient(patient: Patient): void {
        this.patients.push(patient);
    }

    addDoctor(doctor: Doctor): void {
        this.doctors.push(doctor);
    }

    addAppointment(appointment: Appointment): void {
        const doctor = appointment.doctor;
        const patient = appointment.patient;

        const patientAge = patient.Age;

        if (patientAge >= doctor.minAge && patientAge <= doctor.maxAge) {
            this.appointments.push(appointment);
            console.log(`Appointment added for ${patient.getFullName()} with ${doctor.getFullName()}`);
        } else {
            console.log(`Cannot add appointment for ${patient.getFullName()} with ${doctor.getFullName()} as the patient's age is not within the accepted range.`);
        }
    }

    displayQueues(): void {
        console.log(`Patients in queues at ${this.name} hospital:`);
        this.patients.forEach(patient => {
            console.log(`Patient: ${patient.getFullName()}`);
        });
    }

    displayDoctorAppointments(doctorID: number): void {
        console.log(`Appointments for Doctor ID ${doctorID} at ${this.name} hospital:`);
        const doctorAppointments = this.appointments.filter(appointment => appointment.doctor.getDoctorID() === doctorID);
        doctorAppointments.forEach(appointment => {
            console.log(`Patient: ${appointment.patient.getFullName()}`);
            console.log(`Date: ${appointment.date}, Time: ${appointment.time}`);
        });
    }

    displayPatientAppointments(patientID: number): void {
        console.log(`Appointments for Patient ID ${patientID} at ${this.name} hospital:`);
        const patientAppointments = this.appointments.filter(appointment => appointment.patient.getPatientID() === patientID);
        patientAppointments.forEach(appointment => {
            console.log(`Doctor: ${appointment.doctor.getFullName()}`);
            console.log(`Date: ${appointment.date}, Time: ${appointment.time}`);
        });
    }

    displayAppointmentsToday(): void {
        console.log(`Appointments today at ${this.name} hospital:`);
        const today = new Date().toLocaleDateString();
        const todayAppointments = this.appointments.filter(appointment => appointment.date === today);
        todayAppointments.forEach(appointment => {
            console.log(`Patient: ${appointment.patient.getFullName()}`);
            console.log(`Doctor: ${appointment.doctor.getFullName()}`);
            console.log(`Time: ${appointment.time}`);
        });
    }
}

// Create a hospital
const hospital = new Hospital("Example Hospital");

// Create patients
const patient1 = new Patient("Alice", "Smith", 25, "123 Main St", 1);
const patient2 = new Patient("Bob", "Johnson", 32, "456 Elm St", 2);

// Create doctors
const doctor1 = new Doctor("Dr. Emily", "Anderson", 40, "789 Oak St", "Pediatrician", 1, 101, "Senior Doctor", "Pediatrics");
const doctor2 = new Doctor("Dr. James", "Miller", 35, "567 Pine St", "Cardiologist", 2, 102, "Senior Doctor", "Cardiology");

// Add patients and doctors to the hospital
hospital.addPatient(patient1);
hospital.addPatient(patient2);
hospital.addDoctor(doctor1);
hospital.addDoctor(doctor2);

// Add appointments
const appointment1 = new Appointment(patient1, doctor1, "2023-09-01", "10:00 AM", AppointmentStatus.Planned);
const appointment2 = new Appointment(patient2, doctor2, "2023-09-02", "11:00 AM", AppointmentStatus.Planned);

hospital.addAppointment(appointment1);
hospital.addAppointment(appointment2);

// Create medical records
hospital.createMedicalRecord(patient1, doctor1, "Common cold", "Rest and fluids");
hospital.createMedicalRecord(patient2, doctor2, "High blood pressure", "Prescription medication");

// Display doctor's availability
const doctor1Availability = hospital.getDoctorAvailability(doctor1, "2023-09-01");
console.log(`Doctor ${doctor1.getFullName()} is available at these times: ${doctor1Availability.join(', ')}`);

// Display patient's medical records
const patient1Records = hospital.getMedicalRecords(patient1);
console.log(`Medical records for ${patient1.getFullName()}:`);
patient1Records.forEach(record => {
    console.log(`Diagnosis: ${record.diagnosis}`);
    console.log(`Prescription: ${record.prescription}`);
});

// Mark an appointment as completed
appointment1.markAsCompleted();

// Display doctor's appointments
hospital.displayDoctorAppointments(doctor1.getDoctorID());

// Display patient's appointments
hospital.displayPatientAppointments(patient1.getPatientID());

// Display all appointments today
hospital.displayAppointmentsToday();
