import { MotionSensor, SurveillanceController, VideoRecorder } from '../core/surveillanceController';

describe('The Surveillance Controller', () => {
	let sensor: MotionSensor;
	let recorder: VideoRecorder;
	let controller: SurveillanceController;

	beforeEach(() => {
		sensor = new FakeSensor();
		recorder = new FakeRecorder();
		controller = new SurveillanceController(sensor, recorder);
	});

	it('should ask the recorder to stop recording when the sensor detects no motion', () => {
		const spyRecorder = jest.spyOn(recorder, 'stopRecording');

		controller.recordMotion();

		expect(spyRecorder).toHaveBeenCalled();
		expect(sensor.isDetectingMotion()).toBe(false);
	});

	it('should ask the recorder to start recording when the sensor detects motion', () => {
		const spyRecorder = jest.spyOn(recorder, 'startRecording');
		const stubSensor = jest.spyOn(sensor, 'isDetectingMotion');
		stubSensor.mockImplementation(() => true);

		controller.recordMotion();

		expect(spyRecorder).toHaveBeenCalled();
		expect(sensor.isDetectingMotion()).toBe(true);
	});

	it('should ask the recorder to stop  recording when sensor throws an unexpected error', () => {
		const stubSensor = jest.spyOn(sensor, 'isDetectingMotion');
		stubSensor.mockImplementation(() => {
			throw new Error('unexpected error');
		});
		const spyRecorder = jest.spyOn(recorder, 'stopRecording');

		controller.recordMotion();

		expect(spyRecorder).toHaveBeenCalled();
	});

	it('should check the sensor status once per second', () => {
		const spySensor = jest.spyOn(sensor, 'isDetectingMotion');
		const numberOfSeconds = 3;

		controller.recordMotion(numberOfSeconds);

		expect(spySensor).toHaveBeenCalledTimes(numberOfSeconds);
	});
});

class FakeSensor implements MotionSensor {
	isDetectingMotion(): boolean {
		return false;
	}
}

class FakeRecorder implements VideoRecorder {
	startRecording(): void {
		// eslint-disable-next-line no-console
		console.log('start recording');
	}

	stopRecording(): void {
		// eslint-disable-next-line no-console
		console.log('stop recording');
	}
}
