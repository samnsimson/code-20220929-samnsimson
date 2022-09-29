import { BMICalculator } from "./main";
import data from "./data.json";
import { testResult } from "./constants";

describe("Test all methods of a class", () => {
    it("Validates class instance", () => {
        const calculator = new BMICalculator();
        expect(calculator).toBeInstanceOf(BMICalculator);
    });

    it("Converts cms to m", () => {
        const result = new BMICalculator()["convertToMeter"](175);
        expect(result).toEqual(1.75);
    });

    it("Returns the BMI", () => {
        const result = new BMICalculator()["getBodyMassIndex"](175, 75);
        expect(result).toEqual("24.5");
    });

    it("Generates report for category", () => {
        const Underweight = new BMICalculator()["report"](18, "category");
        const Normal = new BMICalculator()["report"](24, "category");
        const Overweight = new BMICalculator()["report"](27, "category");
        const Moderate = new BMICalculator()["report"](31, "category");
        const Severe = new BMICalculator()["report"](36, "category");
        const Very = new BMICalculator()["report"](42, "category");
        expect(Underweight).toEqual("Underweight");
        expect(Normal).toEqual("Normal Weight");
        expect(Overweight).toEqual("Overweight");
        expect(Moderate).toEqual("Moderately obese");
        expect(Severe).toEqual("Severely obese");
        expect(Very).toEqual("Very severely obese");
    });

    it("Generates report for risk", () => {
        const Malnutrition = new BMICalculator()["report"](18, "risk");
        const Low = new BMICalculator()["report"](24, "risk");
        const Enhanced = new BMICalculator()["report"](27, "risk");
        const Medium = new BMICalculator()["report"](31, "risk");
        const High = new BMICalculator()["report"](36, "risk");
        const Very = new BMICalculator()["report"](42, "risk");
        expect(Malnutrition).toEqual("Malnutrition risk");
        expect(Low).toEqual("Low risk");
        expect(Enhanced).toEqual("Enhanced risk");
        expect(Medium).toEqual("Medium risk");
        expect(High).toEqual("High");
        expect(Very).toEqual("Very high risk");
    });

    it("Returns BMI data", () => {
        const calculator = new BMICalculator();
        const result = calculator.calculateBMI(data);
        expect(result).toEqual(testResult);
    });
});
