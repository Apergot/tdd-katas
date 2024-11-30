import { MotionSensor, SurveillanceController, VideoRecorder } from '../core/surveillanceController';

describe('The Surveillance Controller', () => {
	it('should ask the recorder to stop recording when the sensor detects no motion', () => {
		const sensor = new StubSensorDetectingNoMotion();
		const recorder = new SpyRecorder();
		const controller = new SurveillanceController(sensor, recorder);

		controller.recordMotion();

		expect(recorder.stopRecordingCalled).toBeTruthy();
	});

	it('should ask the recorder to start recording when the sensor detects motion', () => {
		const sensor = new StubSensorDetectingMotion();
		const recorder = new SpyRecorder();
		const controller = new SurveillanceController(sensor, recorder);

		controller.recordMotion();

		expect(recorder.startRecordingCalled).toBeTruthy();
	});
});

class StubSensorDetectingNoMotion implements MotionSensor {
	isDetectingMotion(): boolean {
		return false;
	}
}

class StubSensorDetectingMotion implements MotionSensor {
	isDetectingMotion(): boolean {
		return true;
	}
}

class SpyRecorder implements VideoRecorder {
	startRecordingCalled = false;
	stopRecordingCalled = false;

	startRecording(): void {
		this.startRecordingCalled = true;
	}

	stopRecording(): void {
		this.stopRecordingCalled = true;
	}
}
