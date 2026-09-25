import { describe, expect, it } from "vitest";
import {
  CONTACT_INTERESTS,
  isEmail,
  parseContact,
  slug,
  text,
} from "./validation";

describe("isEmail", () => {
  it("accepts a normal address", () => {
    expect(isEmail("jane@company.com")).toBe(true);
  });
  it("rejects missing parts and non-strings", () => {
    expect(isEmail("jane@")).toBe(false);
    expect(isEmail("nope")).toBe(false);
    expect(isEmail(42)).toBe(false);
    expect(isEmail(undefined)).toBe(false);
  });
  it("rejects an over-long address", () => {
    expect(isEmail("a".repeat(250) + "@x.com")).toBe(false);
  });
});

describe("text", () => {
  it("trims and enforces bounds", () => {
    expect(text("  hi  ", { min: 2 })).toBe("hi");
    expect(text("a", { min: 2 })).toBeNull();
    expect(text("toolong", { max: 3 })).toBeNull();
    expect(text(123)).toBeNull();
  });
});

describe("slug", () => {
  it("accepts URL-safe slugs", () => {
    expect(slug("restaurant-01")).toBe("restaurant-01");
    expect(slug("hotel")).toBe("hotel");
  });
  it("rejects unsafe or malformed values", () => {
    expect(slug("Restaurant 01")).toBeNull();
    expect(slug("../etc")).toBeNull();
    expect(slug("-leading")).toBeNull();
    expect(slug("")).toBeNull();
    expect(slug(99)).toBeNull();
  });
});

describe("parseContact", () => {
  const valid = {
    name: "Jane Doe",
    email: "jane@company.com",
    message: "We would like to talk about a project.",
  };

  it("parses a valid submission with defaults", () => {
    const result = parseContact(valid);
    expect("data" in result).toBe(true);
    if ("data" in result) {
      expect(result.data.name).toBe("Jane Doe");
      expect(result.data.company).toBeNull();
      expect(result.data.interest).toBe(CONTACT_INTERESTS[0]);
      expect(result.data.concept).toBeNull();
    }
  });

  it("collects field errors for a bad submission", () => {
    const result = parseContact({ name: "", email: "nope", message: "short" });
    expect("errors" in result).toBe(true);
    if ("errors" in result) {
      expect(result.errors.name).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.message).toBeDefined();
    }
  });

  it("keeps a known interest and a valid concept", () => {
    const result = parseContact({
      ...valid,
      interest: "Partnership",
      concept: "restaurant-01",
    });
    if ("data" in result) {
      expect(result.data.interest).toBe("Partnership");
      expect(result.data.concept).toBe("restaurant-01");
    } else {
      throw new Error("expected data");
    }
  });

  it("falls back to the default for an unknown interest, and drops a bad concept", () => {
    const result = parseContact({
      ...valid,
      interest: "Hack the mainframe",
      concept: "not a slug",
    });
    if ("data" in result) {
      expect(result.data.interest).toBe(CONTACT_INTERESTS[0]);
      expect(result.data.concept).toBeNull();
    } else {
      throw new Error("expected data");
    }
  });

  it("does not throw on null or garbage input", () => {
    expect(() => parseContact(null)).not.toThrow();
    expect(() => parseContact("nonsense")).not.toThrow();
    expect("errors" in parseContact(null)).toBe(true);
  });
});
