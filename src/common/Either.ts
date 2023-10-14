export enum EitherType {
    ok = "ok",
    bad = "bad",
}

type Bad<TBad> = {
    type: EitherType.bad
    bad: TBad
}

type Ok<TOk> = {
    type: EitherType.ok
    ok: TOk
}

export type Either<TBad, TOk> = NonNullable<Bad<TBad> | Ok<TOk>>
