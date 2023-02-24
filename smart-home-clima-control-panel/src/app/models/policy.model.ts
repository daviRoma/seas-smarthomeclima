import { PolicyGroup } from 'src/app/models/policy-group.model';

export class Policy {
    id!: number;
	reactiveMargin?: number;
	dangerMargin?: number;
	optimalTemperature?: number;
	startHour?: Date;
	endHour?: Date;
	active?: boolean;
	policyGroup?: PolicyGroup;
}

export class PolicyRequest {
	policies!: Policy[];
	policyGroupId!: number;
}