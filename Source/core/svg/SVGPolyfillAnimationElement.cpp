// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "config.h"
#include "core/svg/SVGPolyfillAnimationElement.h"

#include "core/frame/UseCounter.h"

namespace blink {

SVGPolyfillAnimationElement::SVGPolyfillAnimationElement(const QualifiedName& tagName, Document& document)
    : SVGElement(tagName, document)
{
    UseCounter::count(document, UseCounter::SVGAnimationElement);
}

}
